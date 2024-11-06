import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import type { Project } from '../../types';

interface StageColumnProps {
  stageId: string;
  title: string;
  projects?: Project[];
}

const StageColumn: React.FC<StageColumnProps> = ({ 
  stageId, 
  title, 
  projects = [] // Using default parameter instead of defaultProps
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-2 font-medium text-sm bg-[hsl(var(--secondary))] border-b rounded-t-lg">
        {title} ({projects.length})
      </div>
      <Droppable
        droppableId={stageId}
        type="PROJECT"
        mode="standard"
        direction="vertical"
        isCombineEnabled={false}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-24rem)] ${
              snapshot.isDraggingOver ? 'bg-[hsl(var(--primary-light))]' : 'bg-white'
            }`}
          >
            {projects.map((project, index) => (
              <Draggable 
                key={project.id} 
                draggableId={project.id} 
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`px-3 py-1 text-xs rounded-full ${
                      snapshot.isDragging 
                        ? 'bg-[hsl(var(--primary-light))] shadow-lg' 
                        : 'bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))/80]'
                    }`}
                  >
                    <div className="font-medium truncate">{project.name}</div>
                    <div className="text-[hsl(var(--text-secondary))] truncate text-xs">{project.customer}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default StageColumn;