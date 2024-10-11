﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using WheelsOnChain.Modules.Organizations.Infrastructure.DAL;

#nullable disable

namespace WheelsOnChain.Modules.Organizations.Infrastructure.Migrations
{
    [DbContext(typeof(OrganizationsDbContext))]
    [Migration("20231028233308_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("organizations")
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("WheelsOnChain.Modules.Organizations.Domain.Entities.Organization", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Trustiness")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Organizations", "organizations");
                });
#pragma warning restore 612, 618
        }
    }
}
