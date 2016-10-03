import fs from 'fs'
import path from 'path'
import profiler from 'v8-profiler'

const SIGNAL = `SIGPIPE`
const SNAPSHOT_PATH = process.env.SNAPSHOT_PATH || `.`

function timestamp() {
  return new Date().toISOString().replace(/[T\-\:]/g, `_`).substring(0, 19)
}

function takeSnapshot(snapshotPath) {
  try {
    saveSnapshot(profiler.takeSnapshot(`snapshot`), snapshotPath)
  } catch (e) {
    console.error(`#profiler - error`, e)
  }
}

function saveSnapshot(snapshot, snapshotPath) {
  const buffer = []
  const read = (data, length) => (buffer.push(data))
  const save = () => {
    const file = path.join(snapshotPath, `${timestamp()}.heapsnapshot`)
    fs.writeFile(file , buffer, (err) => {
      if (err) {
        console.error(`#profiler - snapshot error`, err)
      } else {
        console.log(`#profiler - snapshot saved at ${file}`)
      }
      profiler.deleteAllSnapshots()
    })
  }
  snapshot.serialize(read, save)
}

function signalProfiler(options = {}) {
  const { snapshotPath } = options
  console.log(`#profiler - active: "kill -s ${SIGNAL} ${process.pid}"`)
  process.on(SIGNAL, () => {
    console.log(`#profiler - signal ${SIGNAL} received`)
    takeSnapshot(snapshotPath || SNAPSHOT_PATH)
  })
}

export default signalProfiler
