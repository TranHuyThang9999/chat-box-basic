import React from "react";
import {App,} from "zmp-ui";
import ChatBox from "./chatbot/box/box";

const MyApp = () => {
    return (
        <App>
            {/*<SnackbarProvider>*/}
            {/*  <ZMPRouter>*/}
            {/*    <AnimationRoutes>*/}
            {/*      <Route path="/" element={<HomePage></HomePage>}></Route>*/}
            {/*      <Route path="/about" element={<About></About>}></Route>*/}
            {/*      <Route path="/form" element={<Form></Form>}></Route>*/}
            {/*      <Route path="/user" element={<User></User>}></Route>*/}
            {/*    </AnimationRoutes>*/}
            {/*  </ZMPRouter>*/}
            {/*</SnackbarProvider>*/}
            <ChatBox/>
            {/*<NotConcurrentRendering/>*/}
            {/* <ConcurrentRendering/> */}
            {/* <ValidateInput/> */}
        </App>
    );
};
export default MyApp;
