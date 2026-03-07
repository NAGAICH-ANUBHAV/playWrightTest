pipeline {

    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
            args '--ipc=host'
        }
    }

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

    }

    post {

        always {

            junit allowEmptyResults: true, testResults: 'test-results/results.xml'

            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])

            archiveArtifacts artifacts: '''
                playwright-report/**
                test-results/**
                test-results/**/*.png
                test-results/**/*.webm
                test-results/**/*.zip
            ''', fingerprint: true
        }
    }
}
