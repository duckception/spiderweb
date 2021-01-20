export interface Operation {
  operation: 'create' | 'read' | 'update' | 'delete' | 'action' | 'raw',
  data: any,
}
