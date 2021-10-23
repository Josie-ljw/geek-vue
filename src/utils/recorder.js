import RecorderSdk from 'js-audio-recorder';
import md5 from 'js-md5';

class Recorder {
    constructor(params) {
        this.isRecording = false
        this.appKey = params.appKey
        this.appId = params.appId
        this.appsecret = params.appsecret
        this.recorder = new RecorderSdk()
    }

    start() {
        return this.recorder.start().then(() => {
            this.isRecording = true
        })
    }

    async stop() {
        if (this.isRecording) {
            const blob = this.recorder.getWAVBlob()
            console.log('getWAVBlob: ', blob)
            // 调用API接口，转换成文字
            try {
                const res = await this._uploadAudio(blob)
                return res.detail
            } catch (error) {
                console.error('上传audio失败: ', error)
                throw error
            } finally {
                this.isRecording = false
            }
        }
    }

    _uploadAudio(blob) {
        // TODO 跨域问题
        const url = 'https://sfasr-vop.163yun.com/v1/sfasr'
        const headers = this._getReqHeaders()
        
        return fetch(url, {
            body: blob, // must match 'Content-Type' header
            headers,
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
        }).then(resp => {
            debugger
            return resp.json()
        })
    }

    _getReqHeaders() {
        const nonce = Math.ceil(Math.random() * 100000) + ''
        const timestamp = Math.ceil(Date.now() / 1000)
        const baseModelId = '2'
        const sign = this._getMd5Sign(nonce, timestamp)

        const params = {
            appKey: this.appKey,
            appId: this.appId,
            nonce,
            timestamp,
            sign,
            baseModelId,
            'Content-Type': 'audio/wave',
        }
        const headers = new Headers()
        Object.keys(params).forEach(item => {
            headers.append(item, params[item])
        })

        return headers
    }

    _getMd5Sign(nonce, timestamp) {
        const sign = `appId=${encodeURIComponent(this.appId)}&nonce=${encodeURIComponent(nonce)}&timestamp=${encodeURIComponent(timestamp)}&appsecret=${encodeURIComponent(this.appsecret)}`
        md5(sign)
        const hash = md5.create()
        hash.update(sign)
        return hash.hex()
    }
}

export default Recorder