import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const getCoords = (a, r = 1) => {
  const rads = (a * Math.PI) / 180;
  const x = parseFloat((r * Math.cos(rads)).toFixed(3));
  const y = parseFloat((r * Math.sin(rads)).toFixed(3));
  return { x, y };
};

const Radial = ({ totalDegrees = 360, centerComponent, radius = 100, children }) => {
  const degreesOfSeparation = totalDegrees / React.Children.count(children);
  console.log('degreesOfSep', degreesOfSeparation);
  return (
    <View style={styles.container}>
      <View style={styles.centerComponent} />
      {React.Children.map(children, (child, index) => {
        const coords = getCoords(degreesOfSeparation * index - 90, radius);
        console.log(
          `Index: ${index}, deg: ${degreesOfSeparation * index}, X: ${coords.x}, Y: ${coords.y}`
        );
        return React.cloneElement(child, {
          style: { ...styles.childComponent(coords), ...child.props.style }
        });
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerComponent: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#000',
    position: 'absolute'
  },
  childComponent: coords => ({
    position: 'absolute',
    transform: [{ translateX: coords.x }, { translateY: coords.y }]
  })
});

Radial.defaultProps = {
  centerComponent: null,
  distanceFromEdgeOfCenter: 100
};

Radial.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  centerComponent: PropTypes.node,
  distanceFromEdgeOfCenter: PropTypes.number
};

export default Radial;
