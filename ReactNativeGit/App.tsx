/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import './patch-FileReader';

import git from 'isomorphic-git/index.umd.min.js';
import http from 'isomorphic-git/http/web/index.js';

import * as promises from './fs';

// typescript style
import * as RNFS from 'react-native-fs';

const readdir = async () => {
  try {
    const files = await promises.readdir(RNFS.DocumentDirectoryPath);
    Alert.alert('readDir', files.join(', '));
  } catch (err) {
    Alert.alert(err.code, err.message + '\n' + JSON.stringify(err, null, 2))
  }
};

const mkdir = async () => {
  try {
    await promises.mkdir(RNFS.DocumentDirectoryPath + '/ReactNativeDevBundle.js');
  } catch (err) {
    Alert.alert(err.code, err.message + '\n' + JSON.stringify(err, null, 2))
  }
}

const getRemoteInfo = async () => {
  const info = await git.getRemoteInfo({
    http,
    url: 'https://github.com/isomorphic-git/isomorphic-git.git',
  });
  if (info && info.refs && info.refs.heads) {
    Alert.alert('List of remote branches', Object.keys(info.refs.heads).join('\n'))
  }
};

declare var global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.buttonContainer}>
              <Button
                title="Test getRemoteInfo"
                onPress={() => getRemoteInfo()}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Test mkdir" onPress={() => mkdir()} />
              <Button title="Test readDir" onPress={() => readdir()} />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.tsx</Text> to change
                this screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
