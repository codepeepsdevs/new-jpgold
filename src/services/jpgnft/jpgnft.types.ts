/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/nft_manager.json`.
 */
export type NftManager = {
  address: "78TGdayzTnEPi8UVMeRgJYSx6uawNB3CHTrcBBMM2gDK";
  metadata: {
    name: "nftManager";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "adminWithdrawFees";
      discriminator: [236, 186, 208, 151, 204, 142, 168, 30];
      accounts: [
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "recipient";
          writable: true;
        },
        {
          name: "feesCollector";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [102, 99, 111, 108, 116];
              }
            ];
          };
        },
        {
          name: "nftManager";
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
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "adminWithdrawMintFees";
      discriminator: [132, 99, 100, 227, 35, 200, 91, 149];
      accounts: [
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "recipient";
          writable: true;
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
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "burnNft";
      discriminator: [119, 13, 183, 17, 194, 243, 38, 31];
      accounts: [
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
                kind: "arg";
                path: "discriminant";
              }
            ];
          };
        },
        {
          name: "tokenAccount";
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
          name: "nftManager";
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
          name: "dicriminant";
          type: "u64";
        }
      ];
    },
    {
      name: "buyNft";
      discriminator: [96, 0, 28, 190, 49, 107, 83, 222];
      accounts: [
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "solPriceUpdate";
        },
        {
          name: "buyer";
          writable: true;
          signer: true;
        },
        {
          name: "seller";
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
                kind: "arg";
                path: "discriminant";
              }
            ];
          };
          relations: ["listing"];
        },
        {
          name: "recipient";
        },
        {
          name: "listing";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [108, 105, 115, 116, 116];
              },
              {
                kind: "account";
                path: "mint";
              },
              {
                kind: "account";
                path: "seller";
              }
            ];
          };
        },
        {
          name: "listingTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [108, 105, 115, 116, 116, 97, 116];
              },
              {
                kind: "account";
                path: "listing";
              }
            ];
          };
        },
        {
          name: "recipientTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "recipient";
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
          name: "sellerAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 116];
              },
              {
                kind: "account";
                path: "seller";
              }
            ];
          };
        },
        {
          name: "feesCollector";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [102, 99, 111, 108, 116];
              }
            ];
          };
        },
        {
          name: "nftManager";
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
          name: "discriminant";
          type: "u64";
        }
      ];
    },
    {
      name: "createCollection";
      discriminator: [156, 251, 92, 54, 233, 2, 16, 82];
      accounts: [
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
                value: [99, 111, 108, 108, 116];
              }
            ];
          };
        },
        {
          name: "tokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 108, 116, 97, 116];
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
              name: "createCollectionArgs";
            };
          };
        }
      ];
    },
    {
      name: "createUserAccount";
      discriminator: [146, 68, 100, 69, 63, 46, 182, 199];
      accounts: [
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "userAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 116];
              },
              {
                kind: "account";
                path: "owner";
              }
            ];
          };
        },
        {
          name: "nftManager";
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
      args: [];
    },
    {
      name: "delistNft";
      discriminator: [91, 249, 165, 185, 22, 7, 119, 176];
      accounts: [
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "owner";
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
                kind: "arg";
                path: "discriminant";
              }
            ];
          };
          relations: ["listing"];
        },
        {
          name: "ownerTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "owner";
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
          name: "listing";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [108, 105, 115, 116, 116];
              },
              {
                kind: "account";
                path: "mint";
              },
              {
                kind: "account";
                path: "owner";
              }
            ];
          };
        },
        {
          name: "listingTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [108, 105, 115, 116, 116, 97, 116];
              },
              {
                kind: "account";
                path: "listing";
              }
            ];
          };
        },
        {
          name: "nftManager";
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
          name: "dicriminant";
          type: "u64";
        }
      ];
    },
    {
      name: "finalizeFractionalizeNft";
      discriminator: [101, 22, 95, 10, 113, 24, 13, 75];
      accounts: [
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
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
                kind: "arg";
                path: "discriminant";
              }
            ];
          };
        },
        {
          name: "newMint";
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
          name: "newTokenAccount";
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
                path: "newMint";
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
          name: "collection";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 108, 108, 116];
              }
            ];
          };
        },
        {
          name: "finalizeData";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [102, 105, 110, 102, 100, 116];
              },
              {
                kind: "account";
                path: "mint";
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
          name: "discriminant";
          type: "u64";
        }
      ];
    },
    {
      name: "finalizeMintNft";
      discriminator: [6, 16, 29, 34, 56, 229, 82, 97];
      accounts: [
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
                kind: "arg";
                path: "discriminant";
              }
            ];
          };
          relations: ["finalizeData"];
        },
        {
          name: "collection";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 108, 108, 116];
              }
            ];
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
          name: "discriminant";
          type: "u64";
        }
      ];
    },
    {
      name: "finalizeOwnershipTransfer";
      discriminator: [139, 103, 10, 238, 21, 250, 171, 56];
      accounts: [
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
      args: [];
    },
    {
      name: "fractionalizeNft";
      discriminator: [246, 111, 6, 215, 204, 212, 172, 66];
      accounts: [
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "goldPriceUpdate";
        },
        {
          name: "solPriceUpdate";
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
                kind: "arg";
                path: "args.discriminant";
              }
            ];
          };
        },
        {
          name: "tokenAccount";
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
          name: "collection";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 108, 108, 116];
              }
            ];
          };
        },
        {
          name: "finalizeData";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [102, 105, 110, 102, 100, 116];
              },
              {
                kind: "account";
                path: "mint";
              }
            ];
          };
        },
        {
          name: "feesCollector";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [102, 99, 111, 108, 116];
              }
            ];
          };
        },
        {
          name: "nftManager";
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
              name: "fractionalizeNftArgs";
            };
          };
        }
      ];
    },
    {
      name: "initiailizeOwnershipTransfer";
      discriminator: [199, 4, 135, 231, 62, 161, 149, 219];
      accounts: [
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
          name: "newOwner";
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
      args: [];
    },
    {
      name: "initializeNftManager";
      discriminator: [147, 206, 240, 109, 205, 47, 201, 28];
      accounts: [
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
          name: "collection";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 108, 108, 116];
              }
            ];
          };
        },
        {
          name: "feesCollector";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [102, 99, 111, 108, 116];
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
              name: "initializeNftManagerArgs";
            };
          };
        }
      ];
    },
    {
      name: "listNft";
      discriminator: [88, 221, 93, 166, 63, 220, 106, 232];
      accounts: [
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "mint";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 105, 110, 116, 116];
              },
              {
                kind: "arg";
                path: "args.discriminant";
              }
            ];
          };
        },
        {
          name: "ownerTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "owner";
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
          name: "collection";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 108, 108, 116];
              }
            ];
          };
        },
        {
          name: "listing";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [108, 105, 115, 116, 116];
              },
              {
                kind: "account";
                path: "mint";
              },
              {
                kind: "account";
                path: "owner";
              }
            ];
          };
        },
        {
          name: "listingTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [108, 105, 115, 116, 116, 97, 116];
              },
              {
                kind: "account";
                path: "listing";
              }
            ];
          };
        },
        {
          name: "nftManager";
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
              name: "listNftArgs";
            };
          };
        }
      ];
    },
    {
      name: "mintNft";
      discriminator: [211, 57, 6, 167, 15, 219, 35, 251];
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
          name: "recipient";
        },
        {
          name: "recipientTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "recipient";
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
              name: "mintNftArgs";
            };
          };
        }
      ];
    },
    {
      name: "updateFees";
      discriminator: [225, 27, 13, 6, 69, 84, 172, 191];
      accounts: [
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
          name: "feesCollector";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [102, 99, 111, 108, 116];
              }
            ];
          };
        },
        {
          name: "nftManager";
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
              name: "updateFeesArgs";
            };
          };
        }
      ];
    },
    {
      name: "updateListingPrice";
      discriminator: [103, 80, 184, 80, 159, 24, 94, 138];
      accounts: [
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "mint";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 105, 110, 116, 116];
              },
              {
                kind: "arg";
                path: "args.discriminant";
              }
            ];
          };
          relations: ["listing"];
        },
        {
          name: "listing";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [108, 105, 115, 116, 116];
              },
              {
                kind: "account";
                path: "mint";
              },
              {
                kind: "account";
                path: "owner";
              }
            ];
          };
        },
        {
          name: "nftManager";
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
              name: "updateListingPriceArgs";
            };
          };
        }
      ];
    },
    {
      name: "updateMetadata";
      discriminator: [170, 182, 43, 239, 97, 78, 225, 186];
      accounts: [
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
        },
        {
          name: "admin";
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
                kind: "arg";
                path: "args.discriminant";
              }
            ];
          };
        },
        {
          name: "nftManager";
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
              name: "updateMetadataArgs";
            };
          };
        }
      ];
    },
    {
      name: "userWithdraw";
      discriminator: [53, 254, 26, 242, 119, 237, 73, 33];
      accounts: [
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "userAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 116];
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "nftManager";
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
          name: "amount";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "feesCollector";
      discriminator: [169, 21, 16, 76, 17, 73, 88, 68];
    },
    {
      name: "finalizeFractionalizeData";
      discriminator: [83, 220, 79, 83, 220, 146, 140, 57];
    },
    {
      name: "finalizeMintData";
      discriminator: [17, 8, 152, 141, 119, 220, 183, 38];
    },
    {
      name: "listing";
      discriminator: [218, 32, 50, 73, 43, 134, 26, 58];
    },
    {
      name: "mintFeesCollector";
      discriminator: [141, 24, 226, 41, 204, 223, 103, 180];
    },
    {
      name: "nftManager";
      discriminator: [187, 79, 185, 127, 104, 191, 51, 235];
    },
    {
      name: "priceUpdateV2";
      discriminator: [34, 241, 35, 99, 157, 126, 244, 205];
    },
    {
      name: "user";
      discriminator: [159, 117, 95, 227, 239, 151, 58, 236];
    }
  ];
  events: [
    {
      name: "buyNftEvent";
      discriminator: [219, 69, 16, 165, 22, 85, 241, 18];
    },
    {
      name: "createUserAccountEvent";
      discriminator: [64, 18, 124, 181, 150, 183, 218, 78];
    },
    {
      name: "delistNftEvent";
      discriminator: [199, 0, 198, 10, 167, 176, 72, 246];
    },
    {
      name: "finalizeFractionalizeNftEvent";
      discriminator: [183, 155, 172, 178, 4, 240, 187, 222];
    },
    {
      name: "finalizeMintNftEvent";
      discriminator: [171, 239, 151, 250, 5, 35, 39, 192];
    },
    {
      name: "fractionalizeNftEvent";
      discriminator: [48, 119, 67, 18, 122, 135, 83, 37];
    },
    {
      name: "listNftEvent";
      discriminator: [198, 238, 53, 99, 190, 86, 159, 141];
    },
    {
      name: "mintNftEvent";
      discriminator: [61, 132, 188, 51, 125, 206, 152, 18];
    },
    {
      name: "updateListingPriceEvent";
      discriminator: [59, 123, 64, 39, 174, 247, 30, 195];
    },
    {
      name: "userWithdrawEvent";
      discriminator: [133, 189, 140, 255, 132, 211, 143, 89];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "sameAuthority";
      msg: "Same authority";
    },
    {
      code: 6001;
      name: "overflow";
      msg: "Overflow  occurred";
    },
    {
      code: 6002;
      name: "invalidMetadata";
      msg: "Invalid metadata";
    },
    {
      code: 6003;
      name: "priceCalculationFail";
      msg: "Price calculation fail";
    },
    {
      code: 6004;
      name: "invalidWeight";
      msg: "Invalid weight";
    },
    {
      code: 6005;
      name: "negativePrice";
      msg: "Negative price";
    },
    {
      code: 6006;
      name: "invalidCollection";
      msg: "Invalid collection";
    },
    {
      code: 6007;
      name: "onlyAdminAllowed";
      msg: "Only admin allowed";
    },
    {
      code: 6008;
      name: "insufficientFunds";
      msg: "Insufficient funds";
    },
    {
      code: 6009;
      name: "notOwner";
      msg: "Not owner";
    },
    {
      code: 6010;
      name: "invalidListing";
      msg: "Invalid listing";
    },
    {
      code: 6011;
      name: "unAuthorized";
      msg: "unauthorized";
    },
    {
      code: 6012;
      name: "invalidFinalizeData";
      msg: "Invalid finalize data";
    },
    {
      code: 6013;
      name: "invalidTokenAccount";
      msg: "Invalid discriminant";
    },
    {
      code: 6014;
      name: "mintFinalizeDataMismatch";
      msg: "Mint did not match with finalize data";
    },
    {
      code: 6015;
      name: "invalidMintSupply";
      msg: "Invalid mint supply";
    },
    {
      code: 6016;
      name: "onlyFutureAuthorityAllowed";
      msg: "Only future authority allowed";
    },
    {
      code: 6017;
      name: "noFutureAuthority";
      msg: "No future authority";
    }
  ];
  types: [
    {
      name: "buyNftEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "buyer";
            type: "pubkey";
          },
          {
            name: "seller";
            type: "pubkey";
          },
          {
            name: "recipient";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "price";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "createCollectionArgs";
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
          }
        ];
      };
    },
    {
      name: "createUserAccountEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "userAccount";
            type: "pubkey";
          },
          {
            name: "owner";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "delistNftEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "fees";
      type: {
        kind: "enum";
        variants: [
          {
            name: "fractionalizeFee";
          },
          {
            name: "sellFee";
          }
        ];
      };
    },
    {
      name: "feesCollector";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "fractionalizeFee";
            type: "u32";
          },
          {
            name: "sellFee";
            type: "u32";
          },
          {
            name: "feesDecimals";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "finalizeFractionalizeData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "weight";
            type: "u64";
          },
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
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "finalizeFractionalizeNftEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "newMint";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "finalizeMintData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "weight";
            type: "u64";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "finalizeMintNftEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "weight";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "fractionalizeNftArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "discriminant";
            type: "u64";
          },
          {
            name: "partB";
            type: {
              defined: {
                name: "mintNftArgs";
              };
            };
          },
          {
            name: "partA";
            type: {
              defined: {
                name: "mintNftArgs";
              };
            };
          }
        ];
      };
    },
    {
      name: "fractionalizeNftEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "finalizeData";
            type: "pubkey";
          },
          {
            name: "discriminant";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "initializeNftManagerArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "fractionalizeFee";
            type: "u32";
          },
          {
            name: "sellFee";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "listNftArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "price";
            type: "u64";
          },
          {
            name: "discriminant";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "listNftEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "listing";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "price";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "listing";
      type: {
        kind: "struct";
        fields: [
          {
            name: "price";
            type: "u64";
          },
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "mintFeesCollector";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "mintNftArgs";
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
    },
    {
      name: "mintNftEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "finalizeData";
            type: "pubkey";
          },
          {
            name: "recipient";
            type: "pubkey";
          },
          {
            name: "price";
            type: "u64";
          },
          {
            name: "discriminant";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "nftManager";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "futureAuthority";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "collection";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "discriminant";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "priceFeedMessage";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "feedId";
            docs: [
              "`FeedId` but avoid the type alias because of compatibility issues with Anchor's `idl-build` feature."
            ];
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "price";
            type: "i64";
          },
          {
            name: "conf";
            type: "u64";
          },
          {
            name: "exponent";
            type: "i32";
          },
          {
            name: "publishTime";
            docs: ["The timestamp of this price update in seconds"];
            type: "i64";
          },
          {
            name: "prevPublishTime";
            docs: [
              "The timestamp of the previous price update. This field is intended to allow users to",
              "identify the single unique price update for any moment in time:",
              "for any time t, the unique update is the one such that prev_publish_time < t <= publish_time.",
              "",
              "Note that there may not be such an update while we are migrating to the new message-sending logic,",
              "as some price updates on pythnet may not be sent to other chains (because the message-sending",
              "logic may not have triggered). We can solve this problem by making the message-sending mandatory",
              "(which we can do once publishers have migrated over).",
              "",
              "Additionally, this field may be equal to publish_time if the message is sent on a slot where",
              "where the aggregation was unsuccesful. This problem will go away once all publishers have",
              "migrated over to a recent version of pyth-agent."
            ];
            type: "i64";
          },
          {
            name: "emaPrice";
            type: "i64";
          },
          {
            name: "emaConf";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "priceUpdateV2";
      docs: [
        "A price update account. This account is used by the Pyth Receiver program to store a verified price update from a Pyth price feed.",
        "It contains:",
        "- `write_authority`: The write authority for this account. This authority can close this account to reclaim rent or update the account to contain a different price update.",
        "- `verification_level`: The [`VerificationLevel`] of this price update. This represents how many Wormhole guardian signatures have been verified for this price update.",
        "- `price_message`: The actual price update.",
        "- `posted_slot`: The slot at which this price update was posted."
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "writeAuthority";
            type: "pubkey";
          },
          {
            name: "verificationLevel";
            type: {
              defined: {
                name: "verificationLevel";
              };
            };
          },
          {
            name: "priceMessage";
            type: {
              defined: {
                name: "priceFeedMessage";
              };
            };
          },
          {
            name: "postedSlot";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "tokenMetadataFields";
      type: {
        kind: "enum";
        variants: [
          {
            name: "name";
          },
          {
            name: "symbol";
          },
          {
            name: "uri";
          }
        ];
      };
    },
    {
      name: "updateFeesArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "fee";
            type: {
              defined: {
                name: "fees";
              };
            };
          },
          {
            name: "newFee";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "updateListingPriceArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "newPrice";
            type: "u64";
          },
          {
            name: "discriminant";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "updateListingPriceEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "listing";
            type: "pubkey";
          },
          {
            name: "newPrice";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "updateMetadataArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "field";
            type: {
              defined: {
                name: "tokenMetadataFields";
              };
            };
          },
          {
            name: "value";
            type: "string";
          },
          {
            name: "discriminant";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "user";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "userWithdrawEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "verificationLevel";
      docs: [
        "Pyth price updates are bridged to all blockchains via Wormhole.",
        "Using the price updates on another chain requires verifying the signatures of the Wormhole guardians.",
        "The usual process is to check the signatures for two thirds of the total number of guardians, but this can be cumbersome on Solana because of the transaction size limits,",
        "so we also allow for partial verification.",
        "",
        "This enum represents how much a price update has been verified:",
        "- If `Full`, we have verified the signatures for two thirds of the current guardians.",
        "- If `Partial`, only `num_signatures` guardian signatures have been checked.",
        "",
        "# Warning",
        "Using partially verified price updates is dangerous, as it lowers the threshold of guardians that need to collude to produce a malicious price update."
      ];
      type: {
        kind: "enum";
        variants: [
          {
            name: "partial";
            fields: [
              {
                name: "numSignatures";
                type: "u8";
              }
            ];
          },
          {
            name: "full";
          }
        ];
      };
    }
  ];
  constants: [
    {
      name: "collectionKey";
      type: "string";
      value: '"collection"';
    },
    {
      name: "collectionTag";
      type: "bytes";
      value: "[99, 111, 108, 108, 116]";
    },
    {
      name: "collectionTokenAccountTag";
      type: "bytes";
      value: "[99, 111, 108, 116, 97, 116]";
    },
    {
      name: "discriminantKey";
      type: "string";
      value: '"discriminant"';
    },
    {
      name: "feesCollectorTag";
      type: "bytes";
      value: "[102, 99, 111, 108, 116]";
    },
    {
      name: "finalizeFractionalizeDataTag";
      type: "bytes";
      value: "[102, 105, 110, 102, 100, 116]";
    },
    {
      name: "finalizeMintDataTag";
      type: "bytes";
      value: "[102, 105, 110, 109, 100, 116]";
    },
    {
      name: "listingTag";
      type: "bytes";
      value: "[108, 105, 115, 116, 116]";
    },
    {
      name: "listingTokenAccountTag";
      type: "bytes";
      value: "[108, 105, 115, 116, 116, 97, 116]";
    },
    {
      name: "listNftPriceDecimals";
      type: "u8";
      value: "2";
    },
    {
      name: "maxAge";
      type: "u64";
      value: "259200";
    },
    {
      name: "mintFeesCollectorTag";
      type: "bytes";
      value: "[109, 102, 99, 111, 108, 116]";
    },
    {
      name: "mintTag";
      type: "bytes";
      value: "[109, 105, 110, 116, 116]";
    },
    {
      name: "nftManagerTag";
      type: "bytes";
      value: "[110, 102, 116, 109, 103]";
    },
    {
      name: "solPriceFeedIdHex";
      type: "string";
      value: '"ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d"';
    },
    {
      name: "userTag";
      type: "bytes";
      value: "[117, 115, 101, 114, 116]";
    },
    {
      name: "weightKey";
      type: "string";
      value: '"weight"';
    }
  ];
};
