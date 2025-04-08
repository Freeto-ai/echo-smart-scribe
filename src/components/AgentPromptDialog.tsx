
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Agent } from '@/types/agent';

interface AgentPromptDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentAgent: Agent | null;
  editedPrompt: string;
  setEditedPrompt: (value: string) => void;
  savePrompt: () => void;
}

const AgentPromptDialog: React.FC<AgentPromptDialogProps> = ({
  isOpen,
  onOpenChange,
  currentAgent,
  editedPrompt,
  setEditedPrompt,
  savePrompt
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {currentAgent?.name} Prompt
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={savePrompt}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgentPromptDialog;
