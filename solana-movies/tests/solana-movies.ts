import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaMovies } from "../target/types/solana_movies";
import { TextEncoder } from "util";
const { PublicKey, SystemProgram, Keypair } = anchor.web3;
import assert from "assert";

const stringToBytes = (input: string): Uint8Array => {
  return new TextEncoder().encode(input);
};

describe("solana-movies", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaMovies as Program<SolanaMovies>;
  const myAccount = Keypair.generate();

  it("Is initialized!", async () => {
    const gifUrl = "https://test.com/3dd";

    const [pda] = await PublicKey.findProgramAddress(
      [
        stringToBytes("gif_account"),
        provider.wallet.publicKey.toBytes(),
        stringToBytes(gifUrl),
      ],
      program.programId
    );
    const tx = await program.methods
      .initialize(gifUrl)
      .accounts({
        movieGif: pda,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    assert.equal(!tx, false);
  });

  it("Get all movies", async () => {
    const gifsByOwner = await program.account.movieGif.all();

    assert.equal(gifsByOwner.length, 1);
  });

  it("Finds movies by pubkey", async () => {
    const gifsByOwner = await program.account.movieGif.all([
      {
        memcmp: {
          bytes: provider.wallet.publicKey.toBase58(),
          offset: 8,
        },
      },
    ]);

    assert.equal(1, gifsByOwner.length);
  });
});
