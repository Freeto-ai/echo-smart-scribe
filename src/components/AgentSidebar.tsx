
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { User, Settings, ChevronDown, ChevronUp, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Agent {
  id: string;
  name: string;
  isActive: boolean;
  prompt: string;
  settings: {
    creative: boolean;
    precise: boolean;
    helpful: boolean;
  }
}

const AgentSidebar: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    { 
      id: '1', 
      name: 'Agent 1', 
      isActive: true, 
      prompt: 'You are a helpful AI assistant. Answer questions accurately and concisely.',
      settings: { creative: true, precise: false, helpful: true } 
    },
    { 
      id: '2', 
      name: 'Agent 2', 
      isActive: false, 
      prompt: 'You are a creative AI assistant. Focus on generating innovative ideas and solutions.',
      settings: { creative: false, precise: true, helpful: true } 
    },
    { 
      id: '3', 
      name: 'Agent 3', 
      isActive: false, 
      prompt: 'You are a precise AI assistant. Prioritize accuracy and detailed explanations.',
      settings: { creative: true, precise: true, helpful: false } 
    },
  ]);
  
  const [expandedAgent, setExpandedAgent] = useState<string | null>('1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAgentId, setCurrentAgentId] = useState<string | null>(null);
  const [editedPrompt, setEditedPrompt] = useState('');

  const toggleAgentActive = (agentId: string) => {
    setAgents(agents.map(agent => ({
      ...agent,
      isActive: agent.id === agentId ? true : false
    })));
  };

  const toggleSetting = (agentId: string, setting: keyof Agent['settings']) => {
    setAgents(agents.map(agent => {
      if (agent.id === agentId) {
        return {
          ...agent,
          settings: {
            ...agent.settings,
            [setting]: !agent.settings[setting]
          }
        };
      }
      return agent;
    }));
  };

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
      setAgents(agents.map(agent => {
        if (agent.id === currentAgentId) {
          return {
            ...agent,
            prompt: editedPrompt
          };
        }
        return agent;
      }));
      setDialogOpen(false);
    }
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
        <div className="p-2 space-y-2 overflow-y-auto max-h-[calc(100%-4rem)]">
          {agents.map(agent => (
            <div key={agent.id} className="bg-background rounded-md overflow-hidden">
              <div 
                className={cn(
                  "flex items-center gap-2 p-3 cursor-pointer",
                  agent.isActive ? "bg-primary text-primary-foreground" : ""
                )}
                onClick={() => toggleAgentActive(agent.id)}
              >
                <User className="h-5 w-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <>
                    <span className="text-sm font-medium flex-1">{agent.name}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpandAgent(agent.id);
                      }}
                      className="p-1 rounded-full hover:bg-accent"
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
              
              {isSidebarOpen && expandedAgent === agent.id && (
                <div className="p-3 bg-background space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Creative</span>
                    <Switch 
                      checked={agent.settings.creative}
                      onCheckedChange={() => toggleSetting(agent.id, 'creative')}
                      className="data-[state=checked]:bg-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Precise</span>
                    <Switch 
                      checked={agent.settings.precise}
                      onCheckedChange={() => toggleSetting(agent.id, 'precise')}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Helpful</span>
                    <Switch 
                      checked={agent.settings.helpful}
                      onCheckedChange={() => toggleSetting(agent.id, 'helpful')}
                      className="data-[state=checked]:bg-purple-500"
                    />
                  </div>
                  <div className="pt-2 border-t mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full flex items-center gap-2"
                      onClick={() => openPromptDialog(agent.id)}
                    >
                      <Edit className="h-3.5 w-3.5" />
                      Edit Agent Prompt
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dialog for editing agent prompts */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {agents.find(a => a.id === currentAgentId)?.name} Prompt
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={editedPrompt}
              onChange={(e) => setEditedPrompt(e.target.value)}
              placeholder="Enter prompt for this agent..."
              className="min-h-[200px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={savePrompt}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AgentSidebar;
