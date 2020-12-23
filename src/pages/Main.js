import React, {useEffect, useState} from 'react';
import {
  StyleSheet, View, Image, TouchableOpacity, Text,
} from 'react-native';

import Angle from '../assets/angle.png';
import Cross from '../assets/cross.png';
import Hyperbole from '../assets/hyperbole.png';
import InfinitySimble from '../assets/infinity.png';
import Pi from '../assets/pi.png';
import Plus from '../assets/plus.png';
import Sigma from '../assets/sigma.png';
import Ui from '../assets/ui.png';

const Main = () => {
  const [figures, setFigures] = useState(null);
  const [figuresCorrect, setFiguresCorrect] = useState(null);
  const [clicked, setClicked] = useState(null);
  const [finish, setFinish] = useState(true);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    restart();
  }, []);

  const restart = () => {
    const arrayFigures = [Angle, Cross, Hyperbole, InfinitySimble, Pi, Plus, Sigma, Ui];
    let arrayFiguresZeros = [];
    let arrayClicked = [];
    let arrayFiguresCorrect = [];

    for (let i = 0; i < 2 * arrayFigures.length; i++) {
      arrayFiguresZeros = [...arrayFiguresZeros, 0];
      arrayClicked = [...arrayClicked, false];
      arrayFiguresCorrect = [...arrayFiguresCorrect, false];
    }

    let position1 = 0;
    let position2 = 0;

    for (let i = 0; i < arrayFigures.length; i++) {
      position1 = Math.floor((arrayFiguresZeros.length - 1) * Math.random());
      while (arrayFiguresZeros[position1] !== 0) {
        position1 += 1;
        if (position1 >= arrayFiguresZeros.length) {
          position1 = 0;
        }
      }
      arrayFiguresZeros[position1] = arrayFigures[i];

      position2 = Math.floor((arrayFiguresZeros.length - 1) * Math.random());
      while (arrayFiguresZeros[position2] !== 0) {
        position2 += 1;
        if (position2 >= arrayFiguresZeros.length) {
          position2 = 0;
        }
      }
      arrayFiguresZeros[position2] = arrayFigures[i];
    }

    setFigures(arrayFiguresZeros);
    setClicked(arrayClicked);
    setFiguresCorrect(arrayFiguresCorrect);
  };

  useEffect(() => {
    if (figuresCorrect) {
      let complet = true;
      for (let i = 0; i < figuresCorrect.length; i++) {
        if (!figuresCorrect[i]) {
          complet = false;
        }
      }
      if (complet) {
        setFinish(true);
      }
    }
  }, [figuresCorrect]);


  const pressCard = (index) => {
    const arrayClicked = [...clicked];
    arrayClicked[index] = true;

    let count = 0;
    for (let i = 0; i < arrayClicked.length; i++) {
      if (arrayClicked[i]) {
        count++;
      }
    }

    if (count === 2) {
      let positions = [];
      for (let i = 0; i < arrayClicked.length; i++) {
        if (arrayClicked[i]) {
          positions = [...positions, i];
        }
      }
      if (figures[positions[0]] === figures[positions[1]]) {
        const arrayFiguresCorrect = [...figuresCorrect];
        arrayFiguresCorrect[positions[0]] = true;
        arrayFiguresCorrect[positions[1]] = true;
        setFiguresCorrect(arrayFiguresCorrect);
      }
      else {
        setPreview(true);
        arrayClicked[positions[1]] = true;
        arrayClicked[positions[0]] = true;
      }
      setTimeout(() => {
        setClicked(arrayClicked => {
          const arr = [...arrayClicked];
          arr[positions[0]] = arr[positions[1]] = false;
          return arr;
        });
        setPreview(false);
      }, 500)
    }
      setClicked(arrayClicked);
  };

  if (!figures) {
    return null;
  }

  return (
    <View style={styles.view}>
      <View style={styles.cardsContainer}>
      {
        figures.map((figure, index) => (
          <View key={index} style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => !preview && pressCard(index)} tabIndex={index}>
            {
              (clicked[index] || figuresCorrect[index]) && (
                <Image style={styles.cardImage} source={figure}/>
              )
            }
          </TouchableOpacity>
            </View>
        ))
      }
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => restart()} style={styles.restartButton} tabIndex={1000}>
          <Text style={styles.restartButtonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#373a4b',
    padding: 20,
  },
  cardsContainer: {
    display: "flex",
    flex: 1,
    flexWrap: 'wrap',
  },
  cardContainer: {
    flexBasis: "25%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  },
  card: {
    width: "80%",
    height: "80%",
    backgroundColor: '#008ABC',
    borderWidth: 2,
    borderColor: '#282a36',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    margin: 0,
    width: "80%",
    height: "80%",
    resizeMode: "contain"
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
  restartButton: {
    backgroundColor: '#008ABC',
    width: "80%",
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restartButtonText: {
    color: '#f5f5f5',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Main;
