import {Configuration} from 'app-builder-lib'

export default {
    directories: {
        output: 'build'
    },
    icon: 'public/logo.png',
    artifactName: '${productName}-${platform}-${arch}-${version}.${ext}',
    nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true
    },
    compression: 'maximum'
} as Configuration