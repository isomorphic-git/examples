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

import { Buffer } from 'buffer';

import './patch-FileReader';

import git, { PromiseFsClient } from 'isomorphic-git/index.umd.min.js';
import http from 'isomorphic-git/http/web/index.js';

import * as promises from './fs';

// @ts-ignore
const fs: PromiseFsClient = { promises }

// typescript style
import * as RNFS from 'react-native-fs';

const readdir = async () => {
  try {
    const files = await promises.readdir(RNFS.DocumentDirectoryPath + '/repo/.git/objects/pack');
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

const readFile = async () => {
  try {
    // const content = await promises.readFile(RNFS.DocumentDirectoryPath + '/repo/test.txt', 'utf8');
    const content = await promises.readFile(RNFS.DocumentDirectoryPath + '/repo/.git/config', 'utf8');
    Alert.alert('readFile', content as string)
  } catch (err) {
    Alert.alert(err.code, err.message + '\n' + JSON.stringify(err, null, 2))
  }
}

const writeFile = async () => {
  try {
    await promises.writeFile(RNFS.DocumentDirectoryPath + '/repo/test.txt', 'Hello\nWorld\n', 'utf8');
  } catch (err) {
    Alert.alert(err.code, err.message + '\n' + JSON.stringify(err, null, 2))
  }
}

const unlink = async () => {
  try {
    await promises.unlink(RNFS.DocumentDirectoryPath + '/repo/test.txt')
  } catch (err) {
    Alert.alert(err.code, err.message + '\n' + JSON.stringify(err, null, 2))
  }
}

const rmdir = async () => {
  try {
    await promises.rmdir(RNFS.DocumentDirectoryPath + '/repo')
  } catch (err) {
    Alert.alert(err.code, err.message + '\n' + JSON.stringify(err, null, 2))
  }
}

const stat = async () => {
  try {
    let stats = await promises.stat(RNFS.DocumentDirectoryPath + '/repo/test.txt');
    Alert.alert('stat', JSON.stringify(stats, null, 2))
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + JSON.stringify(err, null, 2))
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

const init = async () => {
  try {
    await git.init({ fs, dir: RNFS.DocumentDirectoryPath + '/repo' });
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + err.stack + '\n' + JSON.stringify(err, null, 2))
  }
}

const add = async () => {
  try {
    await git.add({ fs, dir: RNFS.DocumentDirectoryPath + '/repo', filepath: 'test.txt' });
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + err.stack + '\n' + JSON.stringify(err, null, 2))
  }
}

const listFiles = async () => {
  try {
    const files = await git.listFiles({ fs, dir: RNFS.DocumentDirectoryPath + '/repo' });
    Alert.alert('listFiles', files.join(', '))
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + err.stack + '\n' + JSON.stringify(err, null, 2))
  }
}

const hashBlob = async () => {
  try {
    const { oid } = await git.hashBlob({ object: 'Hello\nWorld\n' });
    Alert.alert('hashBlob', oid)
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + err.stack + '\n' + JSON.stringify(err, null, 2))
  }
}

const commit = async () => {
  try {
    const oid = await git.commit({
      fs,
      dir: RNFS.DocumentDirectoryPath + '/repo',
      message: 'initial commit',
      author: {
        name: 'React Native'
      }
    });
    Alert.alert('commit', oid)
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + err.stack + '\n' + JSON.stringify(err, null, 2))
  }
}

const log = async () => {
  try {
    const commits = await git.log({
      fs,
      dir: RNFS.DocumentDirectoryPath + '/repo'
    });
    Alert.alert('hashBlob', commits.map(c => `${c.oid.slice(0, 7)} ${c.commit.message}`).join('\n'))
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + err.stack + '\n' + JSON.stringify(err, null, 2))
  }
}

const clone = async () => {
  try {
    await git.clone({
      fs,
      http,
      dir: RNFS.DocumentDirectoryPath + '/repo',
      url: 'https://github.com/isomorphic-git/examples.git'
    });
    Alert.alert('clone', 'complete?')
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + err.stack + '\n' + JSON.stringify(err, null, 2))
  }
}


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
              <Button
                title="Test hashBlob"
                onPress={() => hashBlob()}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Test readDir" onPress={() => readdir()} />
              <Button title="Test mkdir" onPress={() => mkdir()} />
              <Button title="Test rmdir" onPress={() => rmdir()} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Test readFile" onPress={() => readFile()} />
              <Button title="Test writeFile" onPress={() => writeFile()} />
              <Button title="Test unlink" onPress={() => unlink()} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Test stat" onPress={() => stat()} />
              <Button title="Test init" onPress={() => init()} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Test add" onPress={() => add()} />
              <Button title="Test listFiles" onPress={() => listFiles()} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Test commit" onPress={() => commit()} />
              <Button title="Test log" onPress={() => log()} />
              <Button title="Test clone" onPress={() => clone()} />
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
