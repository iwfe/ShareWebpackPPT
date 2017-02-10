/**
 * 发布上传配置
 */
export default {
    "project": "iwjw-pc-alc",
    "api": {
        "uploadSuffix": "/resource/uploadAuto.do",
        "openAutoSuffix": "/resource/openAuto.do",
        "versionSuffix": "/resource/getResourceVersion.do"
    },
    "serverEnv": {
        "test": {
            "serverUrl": "http://192.168.1.75",
            "projectId": "72"
        },
        "beta": {
            "serverUrl": "http://121.41.34.206:8150",
            "projectId": "45"
        }
    },
    versionType: 0,
    "zipFilePath": `${process.cwd()}/zip/iwjw-pc-alc.zip`
}
