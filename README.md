# Sync Code

Sync Code is a collaborative, real-time code editor where users can seamlessly code together. It provides a platform for multiple users to enter a room, share a unique room ID, and collaborate on code simultaneously. Users can seamlessly edit and download files while communicating through group chat.

## Tech

#### Frontend

- Made with [React.js](https://reactjs.org/) ⚛️
- Written in [JavaScript](https://www.javascript.com/)
- Styled with [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- Editor created with [codemirror](https://codemirror.net/)
- [Socket.io-client](https://www.npmjs.com/package/socket.io-client) as Web-socket client

#### Backend

- Made with [Express.js](https://www.npmjs.com/package/express)
- Written in [JAvaScript](https://www.javascript.com/)
- [Socket.io](https://www.npmjs.com/package/socket.io) for Web-socket communication

## Demo

[Demo.webm](https://user-images.githubusercontent.com/80352125/209821700-35ce1ecd-4f48-4576-8803-145f4c8ae541.webm)

## Screenshots

![Screenshot from 2022-12-28 14-52-49](https://user-images.githubusercontent.com/80352125/209822098-7ff883a5-f9c8-4f7a-a493-5ecb76e83f2c.png)
![Screenshot from 2022-12-28 14-53-20](https://user-images.githubusercontent.com/80352125/209822124-9c08aa27-e5b6-409e-a2e5-0b67044b45c2.png)
![Screenshot from 2022-12-28 14-53-35](https://user-images.githubusercontent.com/80352125/209822168-0e66d63b-6818-476a-a481-22dbe502bd0b.png)
![Screenshot from 2022-12-28 14-55-28](https://user-images.githubusercontent.com/80352125/209822185-baf2a9e3-78cd-440d-b4ac-0752b5c5703f.png)
![Screenshot from 2022-12-28 14-55-32](https://user-images.githubusercontent.com/80352125/209822196-c70d1018-f427-4779-925d-b08981f9d856.png)

## Configuration and running the Project

### Configuration

- Clone the repository`https://github.com/anuprajvarma/Sync_Code.git`
- Create a .env file:`touch .env`
- Inside the .env file write:`REACT_APP_BACKEND_URL = http://localhost:5400`

### Running the Project

         npm i or yarn
         npm i nodemon
         npm run start:front
         npm run server:dev
