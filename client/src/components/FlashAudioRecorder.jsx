// import React, { Component } from 'react'
// import { Recorder } from 'react-voice-recorder';

// class FlashAudioRecorder extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       audioDetails: {
//           url: null,
//           blob: null,
//           chunks: null,
//           duration: {
//             h: 0,
//             m: 0,
//             s: 0
//           }
//         }
//      }
//      this.handleAudioStop = this.handleAudioStop.bind(this);
//      this.handleAudioUpload = this.handleAudioUpload.bind(this);
//      this.handleCountDown = this.handleCountDown.bind(this);
//      this.handleReset = this.handleReset.bind(this);
//   }

//   handleAudioStop(data){
//       console.log(data)
//       this.setState({ audioDetails: data });
//       console.log('state be like -> ', this.state.audioDetails);
//   }

//   handleAudioUpload(file) {
//       console.log(file);
//   }

//   handleCountDown(data) {
//       console.log(data);
//   }

//   handleReset() {
//     const reset = {
//       url: null,
//       blob: null,
//       chunks: null,
//       duration: {
//         h: 0,
//         m: 0,
//         s: 0
//       }
//     };
//     this.setState({ audioDetails: reset });
//   }

//   render() {
//     return (
//       <Recorder
//         record={true}
//         title={"New recording"}
//         audioURL={this.state.audioDetails.url}
//         showUIAudio
//         handleAudioStop={data => this.handleAudioStop(data)}
//         handleAudioUpload={data => this.handleAudioUpload(data)}
//         handleCountDown={data => this.handleCountDown(data)}
//         handleReset={() => this.handleReset()}
//         mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
//       />
//     )
//   }
// }

// import AudioRecorder from 'react-audio-recorder'

// class FlashAudioRecorder extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       recordState: null
//     }
//   }

//   start = () => {
//     this.setState({
//       recordState: RecordState.START
//     })
//   }

//   stop = () => {
//     this.setState({
//       recordState: RecordState.STOP
//     })
//   }

//   //audioData contains blob and blobUrl
//   onStop = (audioData) => {
//     console.log('audioData', audioData)
//   }

//   render() {
//     const { recordState } = this.state

//     return (
//       <div>
//         <AudioRecorder />

//         <button onClick={this.start}>Start</button>
//         <button onClick={this.stop}>Stop</button>
//       </div>
//     )
//   }
// }


// import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
// import ReactPlayer from 'react-player';

// class FlashAudioRecorder extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       recordState: null,
//       audioBlob: null,
//       url: '',
//     }
//     this.start = this.start.bind(this);
//     this.stop = this.stop.bind(this);
//     this.onStop = this.onStop.bind(this);
//   }

//   start = () => {
//     this.setState({
//       recordState: RecordState.START
//     })
//   }

//   stop = () => {
//     this.setState({
//       recordState: RecordState.STOP
//     })
//   }

//   //audioData contains blob and blobUrl
//   onStop = (audioData) => {
//     console.log('audioData', audioData)
//     let url = audioData.url.slice(5);
//     console.log('url be like -> ', url);
//     this.setState({
//       recordState: this.state.recordState,
//       audioBlob: audioData,
//       url: url,
//     })
//   }

//   render() {
//     const { recordState } = this.state

//     return (
//       <div>
//         <AudioReactRecorder state={recordState} onStop={this.onStop} />
//         <ReactPlayer url={this.state.url} />

//         <button onClick={this.start}>Start</button>
//         <button onClick={this.stop}>Stop</button>
//       </div>
//     )
//   }
// }


// export default FlashAudioRecorder;