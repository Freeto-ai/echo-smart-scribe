
import React from 'react';
import { User, Settings, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Agent } from '@/types/agent';

interface AgentItemProps {
  agent: Agent;
  expandedAgent: string | null;
  toggleAgentActive: (agentId: string) => void;
  toggleExpandAgent: (agentId: string) => void;
  toggleSetting: (agentId: string, setting: keyof Agent['settings']) => void;
  openPromptDialog: (agentId: string) => void;
}

const AgentItem: React.FC<AgentItemProps> = ({ 
  agent, 
  expandedAgent, 
  toggleAgentActive, 
  toggleExpandAgent, 
  toggleSetting,
  openPromptDialog 
}) => {
  return (
    <div key={agent.id} className="bg-background rounded-md overflow-hidden">
      <div 
        className={cn(
          "flex items-center gap-2 p-3 cursor-pointer",
          agent.isActive ? "bg-primary text-primary-foreground" : ""
        )}
        onClick={() => toggleAgentActive(agent.id)}
      >
        <User className="h-5 w-5 flex-shrink-0" />
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
      </div>
      
      {expandedAgent === agent.id && (
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
  );
};

export default AgentItem;
