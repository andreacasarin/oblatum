##
## JUST SOME EXAMPLES
##

DeedAuthority.deployed().then(instance => instance.issue('0x4a43bc79e125a6c58caa37191e27992fc99edaa2', '123', '123', '123'));

DeedAuthority.deployed().then(instance => instance.isGenuine('0x255e27Fdf77982F80977d39a86805B5ad7C6bb49'));

web3.eth.sendTransaction({from:'0xe84c2b9bef450ec97cee258de8d11cd07ef9719a', to:'0x7630805Dfc2063E4b27Ba222a73C6ec2AF66A244', value: 1});
