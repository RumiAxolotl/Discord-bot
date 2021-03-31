module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`${client.user.username} is ready, Quack`);
        client.user.setActivity(`Rubber Duck`)
    }
}