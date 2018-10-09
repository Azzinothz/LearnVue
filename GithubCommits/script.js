const apiURL = 'https://api.github.com/repos/azzinothz/QQRecordVisualization/commits?per_page=3&sha='

let demo = new Vue({
    el: "#demo",
    data: {
        branches: ['master'],
        currentBranch: 'master',
        commits: null
    },

    created: function () {
        this.fetchData()
    },

    watch: {
        currentBranch: "fetchData"
    },

    filter: {
        truncate: function (v) {
            let newline = v.indexOf("\n")
            return newline > 0 ? v.slice(0, newline) : v
        },
        formatData: function (v) {
            return v.replace(/T|Z/g, " ")
        }
    },

    methods: {
        fetchData: function () {
            let xhr = new XMLHttpRequest()
            let self = this
            xhr.open('GET', apiURL + self.currentBranch)
            xhr.onload = function () {
                self.commits = JSON.parse(xhr.responseText)
            }
            xhr.send()
        }
    }
})
