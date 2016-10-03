# Signal Profiler

Attach a listener to a SIGPIPE signal, that will trigger [v8-profiler](https://github.com/node-inspector/v8-profiler) snapshot.

## Installation

```
npm install --save signal-profiler
```

## Usage

```javascript
import signalProfiler from 'signal-profiler'

// attach profiler
signalProfiler()
```

OR

```javascript
var signalProfiler = require('signal-profiler')

// attach profiler
signalProfiler()
```

The console will show this:
```
#profiler - active: "kill -s SIGPIPE ${PID}"
```

Run the command (`kill -s SIGPIPE ${PID}`) to save a snapshot.

```
#profiler - signal SIGPIPE received
#profiler - snapshot saved at 2016_10_03_03_44_10.heapsnapshot
```

## Options

```
signalProfiler({
  // folder to save the snapshot
  snapshotPath: `.`
})
```

- `process.env.SNAPSHOT_PATH`: same as `snapshotPath`
