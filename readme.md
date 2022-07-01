# Project management app

## Requirements

- NodeJS (16.x.x);
- NPM (8.x.x);

## How to Run

1. Fill .env file
2. `npm run install` at the root
3. `npx simple-git-hooks` at the root
4. Run: `npm run start`

## Development

### Branch flow

```
<type>/PMA-<ticket-number>-<short-desc>
```

#### Types:

- `task`
- `fix`

#### Examples:

- `task/PMA-15-add-private-routes`
- `task/PMA-9-change-button-styles`
- `fix/PMA-32-fix-task-validation`

### Commit flow

```
PMA-<ticket-number>: <desc>
```

#### Examples:

- `PMA-15: add private routes`
- `PMA-9: edit button styles`
- `PMA-32: remove date field from task`
