export interface Operation {
  action: 'create' | 'read' | 'update' | 'delete' | 'execute' | 'raw',
  data: any,
}
