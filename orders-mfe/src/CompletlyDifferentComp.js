import React from "react";

function CompletlyDifferentComp() {
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        border: "2px dotted black",
      }}
    >
      This is a completely different component, not part of the any entry point.
      It is exposed as module via exposed config in webpack config. Just to show
      entry point and exposed module are independent of each other. After build,
      if you see the remoteEntry.js, you will see this component is included in
      the remoteEntry.js mappings.
      <hr />
      You can use this component in the host app by importing it like this:
      <pre>
        import CompletlyDifferentComp from "ordersMfe/CompletlyDifferentComp";
      </pre>
      <hr />
      You will see this component be rendered when app run via shell, but if you
      only run this order app via cd order-mfe, npm run dev, then you will find
      this component is not rendered.
    </div>
  );
}

export default CompletlyDifferentComp;
