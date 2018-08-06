import React from 'react'
import {
  StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
    footerContainer: {
      marginTop: 5,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
    },
    footerText: {
      fontSize: 14,
      color: '#aaa',
    },
    textInput: {
      height: 45,
      borderRadius: 5,
      borderWidth: 0.5,
      paddingHorizontal: 20,
      paddingLeft: 10, 
      paddingRight: 10,
      marginLeft: 5, 
      marginRight: 5, 
      marginBottom: 5, 
      backgroundColor: 'white', 
      flex: 1,
    },
    footer: {
      flexDirection: 'row',
      padding: 10,
      paddingTop: 8,
      backgroundColor: '#f2f2f2'
    },
    modalContent: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    icon: {
      fontSize: 30, color: '#4B4B4B',
    },
  })

  export default styles
   