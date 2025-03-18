/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/nft_manager.json`.
 */
export type NftManager = {
  address: "";
  metadata: {
    name: "nftManager";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "mint";
      discriminator: [51, 57, 225, 47, 182, 146, 137, 166];
      accounts: [
        {
          name: "goldPriceUpdate";
        },
        {
          name: "solPriceUpdate";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "mint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 105, 110, 116, 116];
              },
              {
                kind: "account";
                path: "nft_manager.discriminant";
                account: "nftManager";
              }
            ];
          };
        },
        {
          name: "destination";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "signer";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "finalizeData";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [102, 105, 110, 109, 100, 116];
              },
              {
                kind: "account";
                path: "mint";
              }
            ];
          };
        },
        {
          name: "mintFeesCollector";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 102, 99, 111, 108, 116];
              }
            ];
          };
        },
        {
          name: "nftManager";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [110, 102, 116, 109, 103];
              }
            ];
          };
        }
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "mintArgs";
            };
          };
        }
      ];
    },
    {
      name: "mintArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          },
          {
            name: "symbol";
            type: "string";
          },
          {
            name: "uri";
            type: "string";
          },
          {
            name: "weight";
            type: "u64";
          }
        ];
      };
    }
  ];
};
