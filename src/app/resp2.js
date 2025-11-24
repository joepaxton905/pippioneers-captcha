<div>
  <h1>Clients and their Withdrawals</h1>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Client Name</th>
        <th>Email</th>
        <th>Withdraw Amount</th>
        <th>Withdraw Method</th>
        <th>Remittance Address</th>
      </tr>
    </thead>
    <tbody>
      {clients.map(
        (client, clientIndex) =>
          client.deposit &&
          // Filter deposits where action is "WITHDRAW"
          client.deposit
            .filter((d) => d.action === "WITHDRAW")
            // Sort by latest transaction first (assumes latest deposit is last in the array)
            .reverse()
            .map((d, depositIndex) => (
              <tr key={`${clientIndex}-${depositIndex}`}>
                <td>{clientIndex + 1}</td>
                <td>{client.firstname}</td>
                <td>{client.email}</td>
                <td>{d.depositAmount}</td>
                <td>{d.depositMethod}</td>
                <td>{d.theRemit}</td>
              </tr>
            ))
      )}
    </tbody>
  </table>
</div>;
