import styled from 'styled-components';

export const MainMenuDiv = styled.div`
  text-align: center;
  top: 0;
  left: 0;
  position: relative;
  background-image: url('https://acegif.com/wp-content/gifs/fire-15.gif');
  background-size: cover;
  padding: 3%;
  margin-top: 10%;
  border: 4px ridge darkred;
  border-radius: 12px;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const MainMenuTitle = styled.h2`
  grid-column: 1;
  grid-row: 1;
  margin-bottom: 3%;
  text-align: center;
  font-family: 'Luckiest Guy', cursive;
`;

export const CollectionsDiv = styled.div`
  background-color: black;
  border: 2px ridge darkred;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2%;
`;

export const UserCollectionsDiv = styled.div`
  margin-top: 2%;
  margin-bottom: 4%;
  border: 2px ridge darkred;
  border-radius: 12px;
  padding: 6%;
  text-align: center;
  width: 95%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const UserCollections = styled.h4`
  padding: 2%;
  transition: .2s;
  width: fit-content;
  cursor: pointer;
  font-family: 'Bangers', cursive;
  &:hover {
    border-bottom: 3px ridge darkred;
    border-radius: 12px;
    color: red;
    transform: scale(1.25);
  }
`;

export const TimeFormatDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px ridge white;
  border-radius: 12px;
  padding: 2%;
  margin: 2%;
  transition: .2s;
  &:hover {
    transform: scale(1.15);
    box-shadow: 4px 4px 6px red, 0 0 1em white, 0 0 0.2em white;
  }
`;

export const ArrowDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2%;
`;

export const UpButton = styled.button`
  width: fit-content;
  padding: 1%;
  background-color: black;
  transition: .2s;
  margin: 4%;
  border-radius: 8px;
  color: white;
  &:hover {
    transform: scale(1.15);
    box-shadow: 4px 4px 6px yellow, 0 0 1em white, 0 0 0.2em white;
    color: yellow;
  }
`;

export const DownButton = styled.button`
  width: fit-content;
  padding: 1%;
  background-color: black;
  margin: 4%;
  transition: .2s;
  border-radius: 8px;
  color: white;
  &:hover {
    transform: scale(1.15);
    box-shadow: 4px 4px 6px yellow, 0 0 1em white, 0 0 0.2em white;
    color: yellow;
  }
`;

export const CollectionsTitle = styled.h3`
  text-align: center;
  color: white;
  background-color: black;
  padding: 1%;
  border-radius: 12px;
  font-family: 'Bangers', cursive;
`;

export const CreateCollectionButton = styled.button`
  border: 2px ridge green;
  border-radius: 12px;
  background-color: black;
  color: white;
  width: 115%;
  transition: .2s;
  margin-top: 4%;
  font-family: 'Bangers', cursive;
  &:hover {
    transform: scale(1.15);
    color: green;
    box-shadow: 4px 4px 6px green, 0 0 1em darkgreen, 0 0 0.2em darkgreen;
  }
`;

export const CreateCollectionsTitle = styled.h2`
  text-align: center;
  grid-column: 1;
  grid-row: 1;
  margin-bottom: 3%;
`;

export const NewCollectionDiv = styled.div`
  background-color: black;
  background-image: url('https://thumbs.gfycat.com/ConfusedMetallicBellfrog-size_restricted.gif');
  background-size: cover;
  border: 2px ridge darkred;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2%;
`;

export const CollectionLabel = styled.label`
  width: fit-content;
  background-color: black;
  border-radius: 12px;
  grid-column: 1;
  text-align: center;
  padding: 1%;
`;

export const CollectionInput = styled.input`
  background-color: darkgrey;
  color: white;
  text-align: left;
  margin-bottom: 2%;
`;

export const CollectionTextArea = styled.textarea`
  background-color: darkgrey;
  color: white;
  text-align: left;
  margin-bottom: 2%;
  width: 90%;
`;

export const CardDiv = styled.div`
  background-image: linear-gradient(to bottom, black, orangered);
  border: 2px ridge darkred;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4%;
  width: 80%;
`;

export const AddCardButton = styled.button`
  border-radius: 12px;
  color: white;
  background-color: black;
  transition: .2s;
  margin-top: 8%;
  &:hover {
    transform: scale(1.15);
    background-color: orangered;
  }
`;

export const TotalCardsSpan = styled.span`
  color: white;
  text-align: center;
`;

export const FinishCollectionButton = styled.button`
  border-radius: 12px;
  color: white;
  background-color: black;
  transition: .2s;
  margin-top: 4%;
  &:hover {
    transform: scale(1.15);
    background-color: orangered;
  }
`;

export const CollCountSpan = styled.span`
  color: yellow;
`;

export const LogoutDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const LogoutButton = styled.button`
  border: 2px ridge darkred;
  border-radius: 12px;
  background-color: black;
  color: white;
  width: fit-content;
  transition: .2s;
  margin-top: 4%;
  font-family: 'Bangers', cursive;
  &:hover {
    transform: scale(1.15);
    color: red;
    box-shadow: 4px 4px 6px red, 0 0 1em orangered, 0 0 0.2em orangered;
  }
`;

export const AddImageInput = styled.input``;

export const AddImageDiv = styled.div``;

export const LastViewSpan = styled.span`
  font-family: 'Shadows Into Light';
  color: yellow;
`;

export const ChooseDiv = styled.div`
  background-image: linear-gradient(to bottom, black, orangered, yellow);
  color: white;
  font-family: 'Luckiest Guy';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 3%;
  &:focus {
    outline: none;
  }
`;

export const ModesDiv = styled.div`
  width: 60%;
  border: 2px ridge darkred;
  border-radius: 12px;
  background-color: black;
  padding-bottom: 2%;
  margin-top: 2%;
`;

export const ChooseTitle = styled.h1`
  margin-top: 2%;
  text-shadow: 6px 6px 8px red, 0 0 1em orange, 0 0 0.2em orange;
`;

export const ModeTitles = styled.h3`
  margin-top: 3%;
  text-shadow: 6px 6px 8px red, 0 0 1em orange, 0 0 0.2em orange;
`;

export const StartButtons = styled.button`
  font-family: 'Luckiest Guy';
  color: white;
  background-color: black;
  border-radius: 12px;
  transition: .2s;
  width: fit-content;
  padding: 1%;
  &:hover {
    transform: scale(1.15);
    border: 2px ridge purple;
    box-shadow: 6px 6px 9px violet, 0 0 1em rebeccapurple, 0 0 0.2em rebeccapurple;
  }
`;

export const ChoiceDivs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HighScoreDiv = styled.div`
  top: 0;
  left: 0;
  background-color: red;
  color: white;
  border: 2px ridge darkred;
  border-radius: 12px;
  text-align: center;
  font-family: 'Luckiest Guy';
  padding-top: 3%;
  padding-bottom: 3%;
`;

export const ModalButton = styled.button`
  position: fixed;
  top: 5%;
  right: 5%;
  background-color: white;
  font-size: 20px;
  border: 2px ridge grey;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
`;

export const ButtonDiv = styled.div`
  display: grid;
`;