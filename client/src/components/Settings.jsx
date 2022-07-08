import React from 'react';
import styled from 'styled-components';

import SharingStats from './SharingStats.jsx';
import Themes from './Themes.jsx';
import Account from './Account.jsx';

const SettingsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  padding: 4%;
  border: 4px ridge red;
  border-radius: 12px;
  width: 60%;
  /* overflow-y: scroll; */
`;
const ButtonDiv = styled.div`
  border: 2px ridge red;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2%;
  width: 100%;
`;

const SettingsButton = styled.button`
  border: 2px ridge rebeccapurple;
  border-radius: 12px;
  background-color: black;
  color: white;
  width: 40%;
  transition: .2s;
  margin-top: 4%;
  font-family: 'Bangers', cursive;
  &:hover {
    transform: scale(1.15);
    color: violet;
    box-shadow: 4px 4px 6px violet, 0 0 1em rebeccapurple, 0 0 0.2em rebeccapurple;
  }
`;

const MainMenuButton = styled.button`
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

const BackButton = styled.button`
  border: 2px ridge rebeccapurple;
  border-radius: 12px;
  background-color: black;
  color: white;
  width: fit-content;
  transition: .2s;
  margin-top: 4%;
  font-family: 'Bangers', cursive;
  &:hover {
    transform: scale(1.15);
    color: violet;
    box-shadow: 4px 4px 6px violet, 0 0 1em rebeccapurple, 0 0 0.2em rebeccapurple;
  }
`;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainMenuIsOpen: true,
      isSharing: false,
      themesAreOpen: false,
    };
    this.shareStats = this.shareStats.bind(this);
    this.openThemes = this.openThemes.bind(this);
    this.viewAccount = this.viewAccount.bind(this);
    this.goBack = this.goBack.bind(this);
    this.backToSettings = this.backToSettings.bind(this);
  }

  shareStats() {
    this.setState({
      mainMenuIsOpen: false,
      isSharing: true,
    });
  }

  openThemes() {
    this.setState({
      mainMenuIsOpen: false,
      themesAreOpen: true,
    });
  }

  viewAccount() {
    this.setState({
      mainMenuIsOpen: false,
    });
  }

  goBack() {
    this.setState({
      mainMenuIsOpen: true,
      isSharing: false,
      themesAreOpen: false,
    })
    this.props.goBack();
  }

  backToSettings() {
    this.setState({
      mainMenuIsOpen: true,
      isSharing: false,
      themesAreOpen: false,
    });
  }

  render() {
    return (
      <SettingsDiv>
        <h1>⚙️-Settings-⚙️</h1>
        <ButtonDiv>
          {
            this.state.mainMenuIsOpen
            ?
            <>
              <SettingsButton onClick={this.shareStats}>
                Share
              </SettingsButton>
              <SettingsButton onClick={this.openThemes}>
                Themes
              </SettingsButton>
              <SettingsButton onClick={this.viewAccount} style={{marginBottom: '4%'}}>
                Account
              </SettingsButton>
            </>
            :
            (
              this.state.isSharing
              ?
              (
                <>
                  <SharingStats />
                  <BackButton onClick={this.backToSettings}>
                    Settings
                  </BackButton>
                </>
              )
              :
              (
                this.state.themesAreOpen
                ?
                (
                  <>
                    <Themes />
                    <BackButton onClick={this.backToSettings}>
                      Settings
                    </BackButton>
                  </>
                )
                :
                (
                  <>
                    <Account />
                    <BackButton onClick={this.backToSettings}>
                      Settings
                    </BackButton>
                  </>
                )
              )
            )
          }
        </ButtonDiv>
        <MainMenuButton onClick={this.goBack}>
          Main Menu
        </MainMenuButton>
      </SettingsDiv>
    );
  }
}

export default Settings;