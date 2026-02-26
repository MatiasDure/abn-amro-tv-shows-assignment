# Deployment
The application is deployed on GitHub Pages for easy access: **https://matiasdure.github.io/abn-amro-tv-shows-assignment/**

# Architectural Decisions

## Framework and Language
React was selected because it is the UI library I am most experienced with and because its component-based approach makes it easier to build interactive UI experiences. TypeScript was selected over JavaScript to add type safety across the application. Strong typing improves reliability, improves IDE support, and reduces errors that would be harder to debug in JavaScript.

## Build Tooling
Vite was chosen over Create React App because of its significantly faster development server startup and build times. CRA relies on an older Webpack-based pipeline, and the React team has officially recommended moving away from CRA in favor of modern build tools. Details can be found in the React team’s announcement: https://react.dev/blog/2025/02/14/sunsetting-create-react-app

## Testing Strategy
Vitest was selected instead of Jest. Although I am more familiar with Jest, integrating it with Vite required additional configurations. Vitest works natively with Vite, requires almost no configuration, and is compatible with most of the Jest API and ecosystem. React Testing Library was used to test components in a similar way to real user interactions and behavior.

## Project Structure
The project initially used a type-based folder structure, but this created friction when trying to find files. It was updated to a feature-based structure, which groups related components, hooks, and logic together. This switch allowed way faster iterations, since related code lived next to each other, and I didn't need to spend time looking through the folders, like with the type-based structure. A `shared/` directory exists for components and utilities used across multiple features.

## Page and Feature Composition
The application contains two main pages: `ShowDashboardPage` and `ShowDetailsPage`. These pages orchestrate the different features (browse, search, favorites, etc.) and build the UI using them. This separation keeps page-level logic focused on layout and orchestration rather than business logic.

## State Management
State initially lived inside custom hooks, but this led to prop drilling and made it difficult to persist state between pages. React Context was introduced to manage global state such as favorites, browse, and search results. This allowed state to persist when navigating between pages and removed deeply nested prop passing, which improved readibility.

## API Layer
API calls were extracted into a separate layer to keep UI components pure. Each API response is passed through a mapper utility to normalize data and handle null fields before using them in the UI. API-driven state includes data, loading, and error fields. These states are consumed by UI components, which render dedicated `Loading` and `Error` components. Because the API rate-limits, mock responses were created from real API responses to allow development without network calls.

## Styling Approach
SCSS was chosen for its readability and support for mixins, nesting, and variables. BEM-style class naming was used to keep styles predictable. Responsive design was implemented using **rem units**, **flexbox**, and **CSS grid** to create scalable layouts and consistent spacing for different screen sizes.

## Performance Considerations
Horizontal lists currently render all items without virtualization. A virtualization solution would improve performance for large lists by rendering only visible items. Because of time constraints, this was not implemented, but it is an area for future improvement. Additional edge cases in API responses could also be handled better with more time.

---

# Running the Project

## Requirements
Node and npm are required. The versions used during development were:

- Node: `24.11.1`  
- npm: `11.6.2`

## Installation

```bash
git clone https://github.com/MatiasDure/abn-amro-tv-shows-assignment.git
npm install
npm run dev
```

## Running Locally
```bash
npm run dev
```

## Running Tests

```bash
npm test
```
