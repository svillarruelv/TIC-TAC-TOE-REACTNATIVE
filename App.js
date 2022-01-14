import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
import { sin } from 'react-native/Libraries/Animated/Easing';
import bg from './assets/bg.jpeg';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1,
      stepNumber: 0
    }
  }

  componentDidMount(){
    this.intializeGame();
  }

  intializeGame = () =>{
    this.setState({
      gameState:
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1,
      stepNumber: 0
    });
  }
  
  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;
    
    //CHECK ROWS
    for (var i = 0; i < NUM_TILES; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if(sum === 3) { return 1;}
      else if (sum === -3) {return -1;}
    }

    //CHECK COLS
    for (var i = 0; i < NUM_TILES; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if(sum === 3) { return 1;}
      else if (sum === -3) {return -1;}
    }

    //CHECK DIAG
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if(sum === 3) { return 1;}
    else if (sum === -3) {return -1;}

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if(sum === 3) { return 1;}
    else if (sum === -3) {return -1;}
    
    return 0;
  }

  onTilePress = (row, col) => {

    //DONT ALLOW TO CHANGE
    var value = this.state.gameState[row][col];
    if (value !== 0 ) {return;}

    //GET CURRENT PLAYER
    var currentPlayer= this.state.currentPlayer;

    //SET THE TILE
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    //SWITCH THE PLAYER...
    var nextPlayer = (currentPlayer === 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    //ADD BOARD COMPLETITION
    var nextStep = this.state.stepNumber + 1
    this.setState({stepNumber: nextStep});

    var winner = this.getWinner();
    if (winner === 1){
      Alert.alert('PLAYER 1 WON');
      this.intializeGame()
    }else if(winner === -1){
      Alert.alert('PLAYER 2 WON');
      this.intializeGame()
    }else if(nextStep===9){
      Alert.alert('ITS DRAW');
      this.intializeGame()
    }
  }

  renderIcon = (row, col) =>{
    var value = this.state.gameState[row][col];
    switch(value){
      case 1: return <Icon name="close" style={styles.tileX} />;
      case -1: return <Icon name="circle-outline" style={styles.tileO} />;
      default: return <View/>;
    }
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row"}}>
              <TouchableOpacity onPress={() => this.onTilePress(0,0)} style={[styles.tile, {borderLeftWidth:0, borderTopWidth:0}]}>
                {this.renderIcon(0,0)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onTilePress(0,1)} style={[styles.tile, {borderTopWidth:0}]}>
                {this.renderIcon(0,1)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onTilePress(0,2)} style={[styles.tile, {borderTopWidth:0, borderRightWidth:0}]}>
              {this.renderIcon(0,2)}
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: "row"}}>
              <TouchableOpacity onPress={() => this.onTilePress(1,0)} style={[styles.tile, {borderLeftWidth:0}]}>
                {this.renderIcon(1,0)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onTilePress(1,1)} style={[styles.tile, {}]}>
                {this.renderIcon(1,1)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onTilePress(1,2)} style={[styles.tile, {borderRightWidth:0}]}>
                {this.renderIcon(1,2)}
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: "row"}}>
              <TouchableOpacity onPress={() => this.onTilePress(2,0)} style={[styles.tile, {borderBottomWidth:0, borderLeftWidth:0}]} >
              {this.renderIcon(2,0)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onTilePress(2,1)} style={[styles.tile, {borderBottomWidth:0, }]} >
                {this.renderIcon(2,1)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onTilePress(2,2)} style={[styles.tile, {borderBottomWidth:0, borderRightWidth:0}]} >
                {this.renderIcon(2,2)}
              </TouchableOpacity>
            </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tileX: {
    color: "red",
    fontSize: 60,
  },

  tileO: {
    color: "green",
    fontSize: 60,
  }
});
