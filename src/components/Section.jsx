export default function Section({label,children,mt=0}){
  return(
    <div style={{marginBottom:40,marginTop:mt}}>
      <div style={{fontSize:9,letterSpacing:"0.22em",color:"rgba(216,180,254,0.9)",marginBottom:18,paddingBottom:10,borderBottom:"1px solid rgba(255,255,255,.04)",fontFamily:"'Courier New',monospace"}}>
        {label}
      </div>
      {children}
    </div>
  );
}
