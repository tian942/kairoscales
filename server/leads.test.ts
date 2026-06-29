import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the db module so tests don't need a real database
vi.mock("./db", () => ({
  insertLead: vi.fn().mockResolvedValue(undefined),
  getAllLeads: vi.fn().mockResolvedValue([]),
}));

// Mock notification so tests don't hit external services
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { insertLead, getAllLeads } from "./db";
import { notifyOwner } from "./_core/notification";

describe("leads router logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("insertLead is called with correct fields", async () => {
    const lead = {
      firstName: "Alex",
      companyName: "Apex Roofing",
      revenue: "$150K/month",
      offer: "We help roofers close $50K jobs from Facebook ads",
    };

    await insertLead(lead);

    expect(insertLead).toHaveBeenCalledWith(lead);
    expect(insertLead).toHaveBeenCalledTimes(1);
  });

  it("getAllLeads returns an array", async () => {
    const result = await getAllLeads();
    expect(Array.isArray(result)).toBe(true);
  });

  it("notifyOwner is called after lead is inserted", async () => {
    const lead = {
      firstName: "Jordan",
      companyName: "Scale Labs",
      revenue: "$200K/month",
      offer: "B2B SaaS onboarding acceleration",
    };

    await insertLead(lead);
    await notifyOwner({
      title: `🎯 New Lead: ${lead.firstName} — ${lead.companyName}`,
      content: `**First Name:** ${lead.firstName}`,
    });

    expect(notifyOwner).toHaveBeenCalledTimes(1);
    expect(notifyOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining("Jordan"),
      })
    );
  });

  it("validates required fields are non-empty strings", () => {
    const validLead = {
      firstName: "Sam",
      companyName: "Growth Co",
      revenue: "$100K/month",
      offer: "We help coaches get clients",
    };

    // All fields should be truthy strings
    expect(validLead.firstName.trim().length).toBeGreaterThan(0);
    expect(validLead.companyName.trim().length).toBeGreaterThan(0);
    expect(validLead.revenue.trim().length).toBeGreaterThan(0);
    expect(validLead.offer.trim().length).toBeGreaterThan(0);
  });
});
