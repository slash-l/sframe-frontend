node {
    def server = Artifactory.server 'saas-server'
    def rtNpm = Artifactory.newNpmBuild()
    def buildInfo

    stage ('Clone') {
        git url: 'https://github.com/slash-l/sframe-frontend.git'
    }

    stage ('Artifactory configuration') {
        rtNpm.deployer repo: 'slash-npm-dev-local', server: server
        rtNpm.resolver repo: 'slash-npm-virtual', server: server
        rtNpm.tool = 'nodejs' // Tool name from Jenkins configuration
        buildInfo = Artifactory.newBuildInfo()
    }

    stage ('Install npm') {
        rtNpm.install buildInfo: buildInfo, path: '.'
    }

    stage ('Publish npm') {
        rtNpm.publish buildInfo: buildInfo, path: '.'
    }

    stage ('Publish build info') {
        server.publishBuildInfo buildInfo
    }

    stage('xray scan'){
        def scanConfig = [
                'buildName': buildInfo.name, //构建名称
                'buildNumber': buildInfo.number //构建号
//                'failBuild': true
        ]
        def scanResult = server.xrayScan scanConfig
        echo "scanResult:" + scanResult;
    }
}
