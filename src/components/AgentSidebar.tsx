
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAgents } from '@/hooks/use-agents';
import AgentItem from './AgentItem';
import AgentPromptDialog from './AgentPromptDialog';

const AgentSidebar: React.FC = () => {
  const { agents, toggleAgentActive, toggleSetting, updateAgentPrompt } = useAgents();
  
  const [expandedAgent, setExpandedAgent] = useState<string | null>('1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAgentId, setCurrentAgentId] = useState<string | null>(null);
  const [editedPrompt, setEditedPrompt] = useState('');

  const toggleExpandAgent = (agentId: string) => {
    setExpandedAgent(expandedAgent === agentId ? null : agentId);
  };

  const openPromptDialog = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      setCurrentAgentId(agentId);
      setEditedPrompt(agent.prompt);
      setDialogOpen(true);
    }
  };

  const savePrompt = () => {
    if (currentAgentId) {
      updateAgentPrompt(currentAgentId, editedPrompt);
      setDialogOpen(false);
    }
  };

  const getCurrentAgent = () => {
    return agents.find(agent => agent.id === currentAgentId) || null;
  };

  return (
    <>
      <div className={cn(
        "fixed top-0 right-0 h-full bg-secondary z-20 transition-all duration-300 ease-in-out shadow-lg",
        isSidebarOpen ? "w-64" : "w-12"
      )}>
        {/* Toggle sidebar button */}
        <button 
          className="absolute left-0 top-4 bg-primary text-white p-1 rounded-l-md transform -translate-x-full"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>

        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b">
          {isSidebarOpen && <h2 className="font-semibold text-lg">Agents</h2>}
          {!isSidebarOpen && <User className="h-5 w-5 mx-auto" />}
        </div>

        {/* Agents list */}
        {isSidebarOpen && (
          <div className="p-2 space-y-2 overflow-y-auto max-h-[calc(100%-4rem)]">
            {agents.map(agent => (
              <AgentItem
                key={agent.id}
                agent={agent}
                expandedAgent={expandedAgent}
                toggleAgentActive={toggleAgentActive}
                toggleExpandAgent={toggleExpandAgent}
                toggleSetting={toggleSetting}
                openPromptDialog={openPromptDialog}
              />
            ))}
          </div>
        )}
      </div>

      <AgentPromptDialog
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        currentAgent={getCurrentAgent()}
        editedPrompt={editedPrompt}
        setEditedPrompt={setEditedPrompt}
        savePrompt={savePrompt}
      />
    </>
  );
};

export default AgentSidebar;
