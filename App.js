import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button, Alert, FlatList } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const fetchData = () => {
    fetch(`https://api.github.com/search/repositories?q=${keyword}`)
    .then(response => response.json())
    .then(data => setRepositories(data.items))
    // .then(data => console.log(keyword))
    .catch(err => Alert.alert("Error", "Something went wrong")) 
  }

  const listSeparator = () => {
    return (
      <View 
      style={{
        height: 2,
        width: "80%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%" }}
        />
    );
  };


  return (
    <View style={styles.container}>
      <FlatList
        data= {repositories}
        keyExtractor= {item => item.id}
        ItemSeparatorComponent = {listSeparator}
        renderItem={({item}) =>
        <View style= {{margin: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.full_name}</Text>
          <Text style={{fontSize: 16 }}>{item.description}</Text>
        </View>
        }
        />
    
     <TextInput 
     style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
     placeholder="Search..."
     onChangeText = {text => setKeyword(text)}
     />
     <Button title="Find" onPress={fetchData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
