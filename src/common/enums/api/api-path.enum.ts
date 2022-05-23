export enum ApiPath {
  ROOT = '/',
  BOARDS = '/boards',
  COLUMNS = '/columns',
  $BOARD_ID_COLUMN = '/boards/:boardId/columns',
  $BOARD_ID_COLUMN_ID_TASK = '/boards/:boardId/columns/:columnId/tasks',
}
