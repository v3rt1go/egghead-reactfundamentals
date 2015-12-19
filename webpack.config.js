module.exports = {
    entry: './main.js', // The entry point of our application
    output: {
        path: './',
        filename: 'index.js' // The resulted (bundled) js file
    },
    devServer: {
        inline: true, // Reload on the fly
        port: 3000
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }    
        ]
    }
};
