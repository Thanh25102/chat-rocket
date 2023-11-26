const MessageLoader = () => {
    return (
        <div className="flex justify-center items-center space-x-1 bg-gray-100 rounded-full "
             style={{width: "52px", height: "24px", margin: "auto 0"}}>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
    );
};

export default MessageLoader;
