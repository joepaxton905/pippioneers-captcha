<div>
  <h1>Clients and their Withdrawals</h1>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Client Name</th>
        <th>Email</th>
        <th>Withdrawal Amount</th>
        <th>Withdrawal Method</th>
        <th>Remittance Address</th>
      </tr>
    </thead>
    <tbody>
      {clients.map((client, clientIndex) => {
        // Filter out only the withdrawals from the client's deposit array
        const withdrawals = client.deposit
          ? client.deposit
              .filter((d) => d.action === "WITHDRAW") // Filter for "WITHDRAW" action
              .sort((a, b) => new Date(b.nyTime) - new Date(a.nyTime)) // Sort by latest first (assuming `nyTime` is the date field)
          : [];

        return withdrawals.map((d, withdrawalIndex) => (
          <tr key={`${clientIndex}-${withdrawalIndex}`}>
            <td>{clientIndex + 1}</td>
            <td>{client.firstname}</td>
            <td>{client.email}</td>
            <td>{d.depositAmount}</td>
            <td>{d.depositMethod}</td>
            <td>{d.theRemit}</td>
          </tr>
        ));
      })}
    </tbody>
  </table>
</div>;
