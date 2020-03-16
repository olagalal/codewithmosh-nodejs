/* Callbacks
console.log('Before');
getUser(1, (user) => {
	getRepositories(user.gitHubUsername, (repos) => {
		getCommits(repos[0], (commits) => {
			console.log(commits);
		})
	})
});
console.log('After');
*/

console.log('Back');
getUser(1)
	.then( user => getRepositories(user.gitHubUsername))
	.then(repos => getCommits(repos[0]))
	.then(commits => console.log('Commits', commits));
console.log('After');

function getUser(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Reading a user from a database...');
			resolve({
				id: id,
				gitHubUsername: 'olagalal'
			});
		}, 2000);
	});
}

function getRepositories(username) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Calling GitHub API...');
			resolve(['repo1', 'repo2', 'repo3']);
		}, 2000);
	});
}

function getCommits(repo) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Calling GitHub API...');
			resolve(['commit']);
		}, 2000);
	});
}