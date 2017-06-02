module.exports = setConfig();

function setConfig(){
	const environments = ["prod","dev","e2e","intr","test"];
	let activeEnv = "dev";

	environments.forEach((env) => {
		if (env === (global.env || process.env.NODE_ENV) ) {
			activeEnv = env;
		}
	});

	return require(`./${activeEnv}`);
}