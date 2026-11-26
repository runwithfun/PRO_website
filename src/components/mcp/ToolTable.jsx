import { Link } from 'react-router-dom';
import { MCP_CATALOG, catalogDate, mcpTools, permissionLabel } from '../../content/mcpTools';

export default function ToolTable() {
  return <div className="connect-tools mcp-tool-table">
    <table>
      <caption>P.R.O. MCP tools, version {MCP_CATALOG.version}, updated {catalogDate}. <a href={MCP_CATALOG.inventory}>tools.json</a> · <Link to="/changelog">What’s new</Link></caption>
      <thead><tr><th scope="col">Tool</th><th scope="col">What it does</th><th scope="col">Access</th><th scope="col">Data switch</th></tr></thead>
      <tbody>{mcpTools.map((t) => <tr key={t.name}><th scope="row"><code>{t.name}</code></th><td data-label="What it does">{t.what}</td><td data-label="Access">{t.access}</td><td data-label="Data switch">{permissionLabel(t.permission)}</td></tr>)}</tbody>
    </table>
  </div>;
}
