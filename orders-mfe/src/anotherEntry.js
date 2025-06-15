// Bootstrap asynchronously to ensure Module Federation works properly
(async () => {
  const React = await import("react");
  const ReactDOM = await import("react-dom");

  ReactDOM.render(
    <div style={{ border: "2px dotted black" }}>
      This is another entry point
    </div>,
    document.getElementById("another-root")
  );
})();
