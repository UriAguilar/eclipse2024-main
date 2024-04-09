import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

export default function App() {
  const moonAnimation = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const backgroundAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(moonAnimation, {
      toValue: { x: 1, y: 1 },
      duration: 10000,
      useNativeDriver: false,
    }).start();
    
    Animated.timing(backgroundAnimation, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: false,
    }).start();
  }, [moonAnimation, backgroundAnimation]);

  const moonPosition = {
    left: moonAnimation.x.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '90%']
    }),
    top: moonAnimation.y.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '90%']
    })
  };

  const moonColor = moonAnimation.x.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['white', 'gray', 'black', 'gray', 'white']
  });

  /*const skyImages = [
    require('./assets/eclipse.jpg'),
  ];*/

  const skyColor = backgroundAnimation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['#72D8FE', '#4682B4', '#142C54', '#4682B4', '#72D8FE']
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: skyColor }]}>
      <Text style={styles.eclipseText}>Eclipse 2024 🌒</Text>
      <View style={styles.sun} />
      <Animated.View style={[styles.moon, moonPosition, { backgroundColor: moonColor }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moon: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  sun: {
    position: 'absolute',
    bottom: '50%',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'orange',
  },
  eclipseText: {
    marginTop: '150%',
  },
});
