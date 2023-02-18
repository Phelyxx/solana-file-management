describe("solana_management_system", () => {
  // Configure the client to use the local cluster.
  let provider = anchor.AnchorProvider.local();
  const docs = anchor.web3.Keypair.generate();
  anchor.setProvider(provider);
  const program = anchor.workspace.SolanaFileSharingSystem;

  it("change docs", async () => {
      await program.rpc.shareDocs("test_title","test_desc","test_doc_hash",{
        accounts:{
          docs:docs.publicKey,
          user:provider.wallet.publicKey,
          systemProgram:SystemProgram.programId
        },
        signers:[docs]
      })
      const account = await program.account.docs.fetch(docs.publicKey);
      assert.equal(account.title,"test_title")
      assert.equal(account.desc,"test_desc")
      assert.equal(account.docs,"test_doc_hash")
  });
  it("changing multiple docs",async()=>{
    const other_docs = anchor.web3.Keypair.generate();
    await program.rpc.shareDocs("new_title","new_desc","new_doc_hash",{
      accounts:{
        docs:other_docs.publicKey,
        user:provider.wallet.publicKey,
        systemProgram:SystemProgram.programId
      },
      signers:[other_docs]
    })
    //previous docs
    const account1 = await program.account.docs.fetch(docs.publicKey);
    assert.equal(account1.title,"test_title")
    assert.equal(account1.desc,"test_desc")
    assert.equal(account1.docs,"test_doc_hash")

    const account2 = await program.account.docs.fetch(other_docs.publicKey);
    assert.equal(account2.title,"new_title")
    assert.equal(account2.desc,"new_desc")
    assert.equal(account2.docs,"new_doc_hash")
  })
});