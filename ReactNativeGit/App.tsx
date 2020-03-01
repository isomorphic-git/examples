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
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

declare var global: {HermesInternal: null | {}};

// BEGIN OF INTERESTING ADDITIONS

import './patch-FileReader';

import { DocumentDirectoryPath } from 'react-native-fs';

import git, { PromiseFsClient } from 'isomorphic-git/index.umd.min.js';
import http from 'isomorphic-git/http/web/index.js';

import * as promises from './fs';

const fs: PromiseFsClient = { promises }

// This is a useful first smoke test, because it doesn't rely on `fs` or `http`
const hashBlob = async () => {
  try {
    const { oid } = await git.hashBlob({ object: 'Hello\nWorld\n' });
    Alert.alert('hashBlob', oid)
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + err.stack + '\n' + JSON.stringify(err, null, 2))
  }
}

// This is a good 2nd smoke test, because it only relies on `http`
const getRemoteInfo = async () => {
  const info = await git.getRemoteInfo({
    http,
    url: 'https://github.com/isomorphic-git/isomorphic-git.git',
  });
  if (info && info.refs && info.refs.heads) {
    Alert.alert('List of remote branches', Object.keys(info.refs.heads).join('\n'))
  }
};

const mkdir = async () => {
  try {
    await promises.mkdir(DocumentDirectoryPath + '/repo');
  } catch (err) {
    Alert.alert(err.code, err.message + '\n' + JSON.stringify(err, null, 2))
  }
}

const readdir = async () => {
  try {
    const files = await promises.readdir(DocumentDirectoryPath + '/repo');
    Alert.alert('readDir', files.join(', '));
  } catch (err) {
    Alert.alert(err.code, err.message + '\n' + JSON.stringify(err, null, 2))
  }
};

const rmdir = async () => {
  try {
    await promises.rmdir(DocumentDirectoryPath + '/repo')
  } catch (err) {
    Alert.alert(err.code, err.message + '\n' + JSON.stringify(err, null, 2))
  }
}

const writeFile = async () => {
  try {
    await promises.writeFile(DocumentDirectoryPath + '/repo/test.txt', 'Hello\nWorld\n', 'utf8');
  } catch (err) {
    Alert.alert(err.code, err.message + '\n' + JSON.stringify(err, null, 2))
  }
}

const readFile = async () => {
  try {
    const content = await promises.readFile(DocumentDirectoryPath + '/repo/test.txt', 'utf8');
    Alert.alert('readFile', content as string)
  } catch (err) {
    Alert.alert(err.code, err.message + '\n' + JSON.stringify(err, null, 2))
  }
}

const unlink = async () => {
  try {
    await promises.unlink(DocumentDirectoryPath + '/repo/test.txt')
  } catch (err) {
    Alert.alert(err.code, err.message + '\n' + JSON.stringify(err, null, 2))
  }
}

const stat = async () => {
  try {
    let stats = await promises.stat(DocumentDirectoryPath + '/repo/test.txt');
    Alert.alert('stat', JSON.stringify(stats, null, 2))
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + JSON.stringify(err, null, 2))
  }
}

// This is a good 3rd test, because it only uses stat, mkdir, and writeFile
const init = async () => {
  try {
    await git.init({ fs, dir: DocumentDirectoryPath + '/repo' });
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + err.stack + '\n' + JSON.stringify(err, null, 2))
  }
}

const add = async () => {
  try {
    await git.add({ fs, dir: DocumentDirectoryPath + '/repo', filepath: 'test.txt' });
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + err.stack + '\n' + JSON.stringify(err, null, 2))
  }
}

const listFiles = async () => {
  try {
    const files = await git.listFiles({ fs, dir: DocumentDirectoryPath + '/repo' });
    Alert.alert('listFiles', files.join(', '))
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + err.stack + '\n' + JSON.stringify(err, null, 2))
  }
}

const commit = async () => {
  try {
    const oid = await git.commit({
      fs,
      dir: DocumentDirectoryPath + '/repo',
      message: 'a commit in react native',
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
      dir: DocumentDirectoryPath + '/repo'
    });
    Alert.alert('hashBlob', commits.map(c => `${c.oid.slice(0, 7)} ${c.commit.message}`).join('\n'))
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + err.stack + '\n' + JSON.stringify(err, null, 2))
  }
}

// This is last, because clone pretty much uses every single function. (Maybe not unlink / rmdir.)
const clone = async (setPhase: any, setProgress: any) => {
  try {
    await git.clone({
      fs,
      http,
      dir: DocumentDirectoryPath + '/repo',
      url: 'https://github.com/isomorphic-git/examples.git',
      onProgress({ phase, loaded, total}) {
        console.log(phase, loaded, total)
        setPhase(phase)
        if (total) {
          setProgress(loaded / total)
        }
      }
    });
    setPhase('')
    setProgress(1)
    Alert.alert('clone', 'complete')
  } catch (err) {
    Alert.alert(err.code, `'${err.message}'` + '\n' + err.stack + '\n' + JSON.stringify(err, null, 2))
  }
}

const App = () => {
  const [progress, setProgress] = React.useState(0)
  const [phase, setPhase] = React.useState('')

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
                title="Test hashBlob"
                onPress={() => hashBlob()}
              />
              <Button
                title="Test getRemoteInfo"
                onPress={() => getRemoteInfo()}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Test mkdir" onPress={() => mkdir()} />
              <Button title="Test readdir" onPress={() => readdir()} />
              <Button title="Test rmdir" onPress={() => rmdir()} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Test writeFile" onPress={() => writeFile()} />
              <Button title="Test readFile" onPress={() => readFile()} />
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
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Test clone" onPress={() => clone(setPhase, setProgress)} />
              <Text>{phase}</Text>
              { Platform.OS === 'android'
                ? <ProgressBarAndroid styleAttr="Horizontal" style={styles.progressBar} progress={progress} indeterminate={false} />
                : <ProgressViewIOS progress={progress} style={styles.progressBar} />
              }
            </View>
            {/* END OF INTERESTING ADDITIONS */}
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
  progressBar: {
    flex: 1,
  }
});

export default App;
