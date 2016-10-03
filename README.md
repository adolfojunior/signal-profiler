# Signal Profiler

Attach a signal listener to trigger `v8-profiler`

## Usage

`npm install --save signal-profiler`

```javascript
import signalProfiler from 'signal-profiler'

// attach profiler
signalProfiler({
  ...options
})
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

- `snapshotPath`: folder to save the snapshot.
- `process.env.SNAPSHOT_PATH`: same as `snapshotPath`
