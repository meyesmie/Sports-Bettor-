export const createMatch = async (req: AuthRequest, res: Response) => {
  const { countryId, leagueId, homeTeamId, awayTeamId, matchDate, kickoffTime, predictions } = req.body;
  const match = await prisma.match.create({
    data: {
      countryId, leagueId, homeTeamId, awayTeamId,
      matchDate: new Date(matchDate), kickoffTime,
      predictions: {
        create: predictions.map((p: any) => ({
          type: p.type, prediction: p.prediction, odds: p.odds,
          confidence: p.confidence, isPremium: p.isPremium, analysis: p.analysis,
        }))
      }
    },
    include: { predictions: true }
  });
  // log audit
  await prisma.auditLog.create({ data: { adminId: req.user.id, action: 'CREATE_MATCH', details: match.id } });
  res.status(201).json(match);
};
