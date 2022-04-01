# Kanban Board
Kanban Board is a minimalist [kanban board](https://en.wikipedia.org/wiki/Kanban_board) app developed by **Angel Cornejo**. It is a React single page app styled with Sass.

**[VIEW IT LIVE HERE](https://cornejoangel.github.io/kanban-board/)**

## Features
- Implements full Create-Read-Update-Delete functionality for both lists and cards using local storage
- Intuitive interface utilizing react-beautiful-dnd library: users can switch the order of lists, move cards within a list or to another
- Card descriptions can be set in a pop-up modal
- Optional dark mode

## A Brief Tour
1. When you first open the app you are greeted by an empty page with a "+" button. Click on the button to create a list.
2. Once you have a list you can optionally give it a title. You are free to create as many lists as you like.
3. You can change the order of your lists by dragging and dropping them.
4. Delete a list by clicking on the "x" in its top right corner.
5. Click on the "+" button inside a list to create a card.
6. Give the card a title (or else the card will be deleted!). Press enter to finish editing the card's title. You can make as many cards as you like.
7. Drag and drop cards to change their order within their list, or move them to another list.
8. Hover your cursor over a card to reveal the card's options - edit name, expand, and delete. The expand button will bring up a modal with the card's name at the top and a text area where you can add more information about that card in the middle.
9. Click on the moon icon in the top right corner of the page to switch to dark mode. Click on the sun icon that took its place to go back to light mode.
10. If you refresh your page you will see that everything is as you left it, including your choice of light or dark mode!

### Made with
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) for all of the drag-and-drop functionality. This is made by Atlassian, who make [Trello](https://trello.com), which inspired this app!
- [react-modal](https://github.com/reactjs/react-modal) for the expanded card view modals.