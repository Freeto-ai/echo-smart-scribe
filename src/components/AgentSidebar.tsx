
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { User, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Agent {
  id: string;
  name: string;
  isActive: boolean;
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
      settings: { creative: true, precise: false, helpful: true } 
    },
    { 
      id: '2', 
      name: 'Agent 2', 
      isActive: false, 
      settings: { creative: false, precise: true, helpful: true } 
    },
    { 
      id: '3', 
      name: 'Agent 3', 
      isActive: false, 
      settings: { creative: true, precise: true, helpful: false } 
    },
  ]);
  
  const [expandedAgent, setExpandedAgent] = useState<string | null>('1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

  return (
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentSidebar;
