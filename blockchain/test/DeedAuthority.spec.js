##
## JUST SOME EXAMPLES
##

DeedAuthority.deployed().then(instance => instance.issue('0x4a43bc79e125a6c58caa37191e27992fc99edaa2', 'chassis123', 'photo123'));

DeedAuthority.deployed().then(instance => instance.isGenuine('0x78F51A411ab033b4B81605C0e74e7eA8Cc3cAF6c'));

#
# https://github.com/ethereumjs/ethereumjs-tx
#
# https://github.com/ethereum/wiki/wiki/JavaScript-API
#


web3.eth.sendTransaction({from:'0xe84c2b9bef450ec97cee258de8d11cd07ef9719a', to:'0xe84c2b9bef450ec97cee258de8d11cd07ef9719a', value: 1});